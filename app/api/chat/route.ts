import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { deepseek } from '@ai-sdk/deepseek';
import { groq } from '@ai-sdk/groq';
import { PROFILE, profileAsText } from '@/lib/profile';

export const maxDuration = 30;

// Limits so a public chat bubble can't run up the API bill.
const MAX_MESSAGES = 12; // only the latest messages are sent to the model
const MAX_CHARS = 800; // per user message
const MAX_REQUESTS_PER_MINUTE = 10; // per visitor IP

// Best-effort rate limit. Serverless instances don't share memory, so this
// slows down abuse rather than stopping it. The provider's spend limit is
// the real safety net.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS_PER_MINUTE;
}

// DeepSeek in production; Groq's free tier works for testing.
function pickModel() {
  if (process.env.DEEPSEEK_API_KEY) return deepseek('deepseek-v4-flash');
  if (process.env.GROQ_API_KEY) return groq('llama-3.3-70b-versatile');
  return null;
}

const INSTRUCTIONS = `You are the assistant on ${PROFILE.name}'s portfolio website.
Answer visitors' questions about ${PROFILE.name}: skills, projects, services, prices and how to get in touch.
Use ONLY the facts below. If something isn't covered, say you don't know and suggest contacting ${PROFILE.name} directly.
${PROFILE.name} is a college student who builds apps through vibe coding (guiding AI tools to write the code). She does not teach or run courses; never say she does.
Keep answers short (2 to 4 sentences), friendly and in the visitor's language (English or Urdu/Roman Urdu).
Never use em dashes (—) or en dashes (–); use commas, colons or full stops instead.
For general questions unrelated to ${PROFILE.name}, briefly say you only answer questions about this portfolio${PROFILE.chatUrl ? ` and point to the full AI chat at ${PROFILE.chatUrl}` : ''}.

FACTS:
${profileAsText()}`;

export async function POST(req: Request) {
  const model = pickModel();
  if (!model) {
    return Response.json({ error: 'The AI is not configured yet.' }, { status: 503 });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (rateLimited(ip)) {
    return Response.json({ error: 'Too many messages. Please wait a minute.' }, { status: 429 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();
  const latest = messages.slice(-MAX_MESSAGES);
  const tooLong = latest.some((m) =>
    m.parts.some((p) => p.type === 'text' && p.text.length > MAX_CHARS),
  );
  if (tooLong) {
    return Response.json({ error: `Please keep messages under ${MAX_CHARS} characters.` }, { status: 400 });
  }

  const result = streamText({
    model,
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(latest),
    maxOutputTokens: 400,
  });

  return result.toUIMessageStreamResponse();
}
