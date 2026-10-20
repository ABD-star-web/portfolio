'use client';

import { useState } from 'react';

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button onClick={copy} className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-medium">
      {copied ? '✓ Email Copied!' : '📧 Copy Email'}
    </button>
  );
}
