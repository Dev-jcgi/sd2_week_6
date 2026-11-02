import { useEffect, useRef, useState } from 'react';
import Deck from '../deck/Deck.jsx';
import { COLS, TEMA_COL, ACT_COL } from '../deck/contenido.jsx';
import { TEMA } from '../data/temas.js';
import Mapa from './Mapa.jsx';
import Marcador from './Marcador.jsx';
import { useVistos } from '../lib/vistos.js';

/* Presentación 2D (reveal.js) + mapa C4 (tecla M) + marcador de equipos (tecla P).
   ?t=t3 abre un tema; ?a=a2 abre una actividad. */
export default function Viewer() {
  const deck = useRef(null);
  const params = new URLSearchParams(location.hash.split('?')[1] || '');
  const [start] = useState(() => {
    const t = params.get('t'), a = params.get('a');
    return { h: t && TEMA_COL[t] != null ? TEMA_COL[t] : a && ACT_COL[a] != null ? ACT_COL[a] : 0, v: 0 };
  });
  const [pos, setPos] = useState(start);
  const [mapa, setMapa] = useState(false);
  const [marcador, setMarcador] = useState(false);
  const [vistos, setVisto] = useVistos();

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest('input,textarea')) return;
      if (e.key === 'm' || e.key === 'M') setMapa((x) => !x);
      if (e.key === 'p' || e.key === 'P') setMarcador((x) => !x);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => { const c = COLS[pos.h]; if (c?.tema && pos.v === c.slides.length - 1) setVisto(c.tema, true); }, [pos.h, pos.v]);

  const col = COLS[pos.h];
  return (
    <div className="viewer">
      <div className="viewer-stage">
        <Deck ref={deck} start={start} onChange={setPos} active={!mapa} />
        {mapa && <div className="viewer-map"><Mapa vistos={vistos} onVisto={setVisto} onOpen={(id) => { setMapa(false); deck.current?.go(TEMA_COL[id], 0); }} /></div>}
        {marcador && <div className="viewer-marcador"><p className="eyebrow">Marcador de equipos · P para cerrar</p><Marcador /></div>}
      </div>
      <nav className="ctrl">
        <button className={`cbtn ${mapa ? 'on' : ''}`} onClick={() => setMapa(!mapa)}>{mapa ? 'Volver a la presentación' : 'Mapa C4 (M)'}</button>
        <button className={`cbtn ${marcador ? 'on' : ''}`} onClick={() => setMarcador(!marcador)}>Marcador (P)</button>
        <span className="mono cnum">{col?.tema ? `Tema ${TEMA[col.tema].n} · ${TEMA[col.tema].titulo}` : col?.titulo} · {pos.h + 1}.{pos.v + 1}</span>
        <span className="grow" />
        <button className="cbtn" onClick={() => document.documentElement.requestFullscreen?.().catch(() => {})} aria-label="Pantalla completa">⛶</button>
      </nav>
    </div>
  );
}
