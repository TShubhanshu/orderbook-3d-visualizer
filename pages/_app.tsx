// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css'; // ✅ Move the global CSS import here

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
