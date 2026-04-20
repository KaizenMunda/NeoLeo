import React from 'react';
import { createRoot } from 'react-dom/client';
import NeoLeoHero from './NeoLeoHero.jsx';

export function mountHero() {
  const container = document.getElementById('hero-root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <NeoLeoHero />
      </React.StrictMode>
    );
  }
}
