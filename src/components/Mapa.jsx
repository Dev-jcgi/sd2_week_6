import { useEffect, useRef, useState } from 'react';
import { Network } from 'vis-network/standalone';
import { TEMAS, TEMA, TIPOS } from '../data/temas.js';
import { ELEMENTOS, VISTAS, VISTA, ABSTRACCION } from '../data/c4.js';

/* Mapa C4 del Delivery System con zoom (vis-network), estilo roadmap.sh.
   - Cada vista es un nivel C4. Doble clic en un elemento con zoom → baja de nivel; doble clic en el fondo → sube.
   - Clic → ficha con la abstracción C4, la explicación, el tema de la clase y el diagrama de Archify. */

const BASE = import.meta.env.BASE_URL;

function nodo(id, [x, y]) {
  const e = ELEMENTOS[id];
  const t = TIPOS[e.tipo];
  const persona = e.tipo === 'persona';
  return {
    id, x, y, label: `<b>${e.label}</b>\n<i>${e.sub}</i>`, shape: 'box',
    margin: { top: persona ? 14 : 10, bottom: 10, left: 14, right: 14 }, widthConstraint: { minimum: 150, maximum: 200 },
    font: { multi: 'html', size: 15, color: '#14171C', face: 'Space Grotesk, Arial', bold: { size: 16 }, ital: { size: 12, color: '#4A5363', face: 'JetBrains Mono, monospace' } },
    color: { background: t.bg, border: t.borde, highlight: { background: '#FFFFFF', border: '#14171C' }, hover: { background: '#FFFFFF', border: t.borde } },
    borderWidth: e.entra ? 4 : 2, shapeProperties: { borderRadius: persona ? 22 : 10, borderDashes: e.tipo === 'externo' ? [6, 4] : false },
    shadow: e.entra ? { enabled: true, color: 'rgba(110,168,255,.85)', size: 20, x: 0, y: 0 } : { enabled: true, color: 'rgba(0,0,0,.25)', size: 8, x: 0, y: 3 },
  };
}

/** Encuadra la vista dejando margen para los controles de arriba y la leyenda de abajo. */
function encuadrar(n, animar) {
  n.fit({ animation: false });
  const scale = n.getScale() * 0.84;
  const pos = n.getViewPosition();
  n.moveTo({ position: { x: pos.x, y: pos.y - 18 / scale }, scale, animation: animar ? { duration: 600, easingFunction: 'easeOutCubic' } : false });
}

function datos(v) {
  const nodes = Object.entries(v.nodos).map(([id, pos]) => nodo(id, pos));
  const edges = v.aristas.map(([a, b, l, dash], i) => ({
    id: `e${i}`, from: a, to: b, label: l || undefined, arrows: { to: { enabled: true, scaleFactor: 0.7 } }, dashes: dash ? [8, 6] : false, width: 2,
    color: { color: dash ? '#B78CFF' : '#7C8798', highlight: '#C6F33A', hover: '#C6F33A' },
    font: { size: 12, face: 'JetBrains Mono, monospace', color: '#C9D1DC', strokeWidth: 4, strokeColor: '#0F1218', align: 'middle' },
    smooth: { enabled: true, type: 'cubicBezier', forceDirection: 'horizontal', roundness: 0.4 },
  }));
  return { nodes, edges };
}

export default function Mapa({ vista: vistaProp, onVista, onOpen, vistos = {}, onVisto, compact = false, controls = true }) {
  const host = useRef(null);
  const net = useRef(null);
  const [vistaLocal, setVistaLocal] = useState('v1');
  const vista = vistaProp ?? vistaLocal;
  const vistaRef = useRef(vista); vistaRef.current = vista;
  const ir = (id) => { onVista ? onVista(id) : setVistaLocal(id); };
  const irRef = useRef(ir); irRef.current = ir;
  const [sel, setSel] = useState(null);
  const [tour, setTour] = useState(false);

  // Crear la red una sola vez.
  useEffect(() => {
    const n = new Network(host.current, datos(VISTA[vista]), {
      physics: false, layout: { improvedLayout: false },
      interaction: { hover: true, dragNodes: true, zoomView: true, dragView: true, tooltipDelay: 120, keyboard: false },
    });
    net.current = n;
    // Ayuda para pruebas automáticas: posición en pantalla de un elemento.
    window.__mapa = { canvasPos: (id) => { const p = n.getPositions([id])[id]; return p ? n.canvasToDOM(p) : null; } };
    n.once('afterDrawing', () => encuadrar(n, false));
    n.on('click', (p) => setSel(p.nodes[0] || null));
    n.on('doubleClick', (p) => {
      const id = p.nodes[0];
      const v = VISTA[vistaRef.current];
      if (id && ELEMENTOS[id].entra) zoom(id, ELEMENTOS[id].entra);
      else if (!id && v.padre) irRef.current(v.padre);
    });
    // Cajas (límites C4) dibujadas detrás de los nodos.
    n.on('beforeDrawing', (ctx) => {
      const v = VISTA[vistaRef.current];
      v.cajas.forEach(({ label, miembros }) => {
        const pos = n.getPositions(miembros);
        let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        miembros.forEach((m) => { const b = n.getBoundingBox(m); if (!b) return; x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom); });
        if (!isFinite(x0) || !Object.keys(pos).length) return;
        const pad = 34;
        ctx.save();
        ctx.strokeStyle = 'rgba(110,168,255,.7)'; ctx.setLineDash([10, 7]); ctx.lineWidth = 2; ctx.fillStyle = 'rgba(110,168,255,.06)';
        ctx.beginPath(); ctx.roundRect(x0 - pad, y0 - pad - 18, x1 - x0 + pad * 2, y1 - y0 + pad * 2 + 18, 18); ctx.fill(); ctx.stroke();
        ctx.setLineDash([]); ctx.fillStyle = '#9DC1FF'; ctx.font = '600 15px JetBrains Mono, monospace';
        ctx.fillText(label.toUpperCase(), x0 - pad + 14, y0 - pad + 4);
        ctx.restore();
      });
    });
    const onResize = () => encuadrar(n, false);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); n.destroy(); };
  }, []);

  // Cambiar de vista (nivel).
  useEffect(() => {
    const n = net.current; if (!n) return;
    n.setData(datos(VISTA[vista]));
    setSel(null);
    n.moveTo({ scale: 0.4 });
    setTimeout(() => encuadrar(n, true), 20);
  }, [vista]);

  // Animación de "zoom" hacia el elemento antes de entrar.
  function zoom(id, destino) {
    const n = net.current;
    n.focus(id, { scale: 2.6, animation: { duration: 650, easingFunction: 'easeInCubic' } });
    setTimeout(() => irRef.current(destino), 620);
  }

  // Recorrido automático por los niveles.
  useEffect(() => {
    if (!tour) return;
    const pasos = [['v1', 'sistema'], ['v2', 'app'], ['v3', 'user'], ['v4', 'd_dominio'], ['v5', null]];
    let i = 0, alive = true;
    irRef.current('v1');
    const next = () => {
      if (!alive) return;
      const [, el] = pasos[i];
      if (!el) { setTour(false); return; }
      net.current.selectNodes([el]); setSel(el);
      setTimeout(() => { if (alive) { zoom(el, pasos[i + 1][0]); i++; setTimeout(next, 2600); } }, 1600);
    };
    const t = setTimeout(next, 1400);
    return () => { alive = false; clearTimeout(t); };
  }, [tour]);

  const v = VISTA[vista];
  const ruta = [];
  for (let x = v; x; x = x.padre ? VISTA[x.padre] : null) ruta.unshift(x);
  const e = sel ? ELEMENTOS[sel] : null;
  const temaSel = e ? TEMA[e.tema] : null;

  return (
    <div className={`mapa ${compact ? 'compact' : ''}`}>
      <div className="mapa-temas" role="list" aria-label="Temas de la clase">
        {TEMAS.map((t) => (
          <button key={t.id} role="listitem" className={`mtema on ${vistos[t.id] ? 'visto' : ''}`} style={{ '--c': t.color }} onClick={() => onOpen?.(t.id)} title={`Ir al tema ${t.n}`}>
            <span className="mono">{vistos[t.id] ? '✓' : t.n}</span>{t.corto}
          </button>
        ))}
      </div>
      <div className="mapa-lienzo">
        <div ref={host} className="mapa-net" aria-label="Mapa C4 interactivo del Delivery System" />
        {controls && (
          <div className="mapa-ctrl">
            <nav className="migas mono" aria-label="Nivel C4">
              {ruta.map((x, i) => (
                <span key={x.id}>{i > 0 && <i>›</i>}<button className={x.id === vista ? 'on' : ''} onClick={() => ir(x.id)}>N{x.nivel} {x.titulo}</button></span>
              ))}
            </nav>
            <button className="cbtn" onClick={() => v.padre && ir(v.padre)} disabled={!v.padre}>↑ Subir</button>
            <button className="cbtn" onClick={() => setTour(!tour)}>{tour ? 'Detener' : 'Recorrer los 4 niveles'}</button>
          </div>
        )}
        <div className="mapa-leyenda">
          {Object.entries(TIPOS).map(([k, t]) => <span key={k}><i style={{ background: t.bg, borderColor: t.borde }} />{t.nombre}</span>)}
          <span><i className="zoom" />doble clic = zoom</span>
        </div>
        {e && temaSel && (
          <aside className="mapa-panel" aria-live="polite">
            <button className="cerrar" onClick={() => setSel(null)} aria-label="Cerrar">✕</button>
            <span className="tema-chip" style={{ background: temaSel.color }}>Tema {temaSel.n} · {temaSel.corto}</span>
            <p className="mono sub">C4 · {ABSTRACCION[e.tipo]}</p>
            <h3>{e.label}</h3>
            <p className="mono sub">{e.sub}</p>
            <p>{e.desc}</p>
            {e.entra && <button className="btn" onClick={() => zoom(sel, e.entra)}>Entrar (zoom) →</button>}
            {onOpen && <button className="btn ghost-l" onClick={() => onOpen(temaSel.id)}>Ver en la presentación →</button>}
            {onVisto && <label className="visto-chk"><input type="checkbox" checked={!!vistos[temaSel.id]} onChange={(ev) => onVisto(temaSel.id, ev.target.checked)} /> Tema visto</label>}
          </aside>
        )}
      </div>
      <div className="mapa-nota"><b className="mono">Nivel {v.nivel} · {v.titulo}</b> {v.nota} <a href={`${BASE}diagramas/${v.diagrama}.html`} target="_blank" rel="noreferrer">diagrama Archify ↗</a></div>
    </div>
  );
}

export { VISTAS };
