// src/pages/_app.tsx
import React from 'react';
import '../styles/globals.css';

export default function App({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}
