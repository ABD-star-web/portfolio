'use client';

import dynamic from 'next/dynamic';

// Three.js is big, so load it after the text so the page appears instantly.
const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-full bg-blue-600/10 blur-3xl" />,
});

export default function Hero3DLazy() {
  return <Hero3D />;
}
