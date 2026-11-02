import { useState } from 'react';
import { store } from './fx.js';

/** Temas marcados como "vistos" en este navegador (progreso estilo roadmap.sh). */
export function useVistos() {
  const [v, setV] = useState(() => store.get('sd2w6-vistos') || {});
  const set = (id, on) => setV((old) => { const n = { ...old, [id]: on }; store.set('sd2w6-vistos', n); return n; });
  return [v, set];
}
