import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TEMAS } from '../data/temas.js';
import Mapa from './Mapa.jsx';
import { useVistos } from '../lib/vistos.js';

const BASE = import.meta.env.BASE_URL;
const GRUPOS = [
  ['Modelo C4', [['c4-contexto', 'Nivel 1 · Contexto'], ['c4-contenedores', 'Nivel 2 · Contenedores'], ['c4-componentes', 'Nivel 3 · Componentes'], ['c4-user-module', 'Nivel 3 · user-module'], ['c4-codigo', 'Nivel 4 · Código']]],
  ['Vistas 4+1', [['v41-logica', 'Lógica'], ['v41-procesos', 'Procesos'], ['v41-desarrollo', 'Desarrollo'], ['v41-fisica', 'Física'], ['v41-escenarios', 'Escenarios (+1)']]],
  ['Diseño OO y patrones', [['ood-dip', 'Inversión de dependencias'], ['patrones-antes', 'Ejercicio · antes'], ['patrones-builder-factory', 'Builder + Factory'], ['patrones-observer', 'Observer'], ['observer-comparacion', 'Observer · antes vs. después'], ['observer-secuencia', 'Observer en secuencia']]],
];

export default function Landing() {
  const hero = useRef(null);
  const [vistos, setVisto] = useVistos();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(hero.current.children, { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all' });
  }, []);
  const n = TEMAS.filter((t) => vistos[t.id]).length;
  return (
    <div className="page landing6">
      <section className="wrap hero6" ref={hero}>
        <p className="eyebrow">Desarrollo de Software 2 · Sección E · Semana 6 · Capstone Delivery System</p>
        <h1 className="display">Arquitectura con <em>zoom</em>.</h1>
        <p className="lead">El Delivery System en el modelo C4: empieza con una sola caja y haz doble clic para bajar a contenedores, componentes, user-module y código. Cada elemento te lleva al tema de la clase que lo explica.</p>
        <div className="cta">
          <a className="btn" href="#/actividades">Actividades</a>
          <a className="btn ghost" href="#/presentacion">Ver la presentación</a>
          <a className="btn ghost" href="#/ejercicio">Ejercicio de patrones</a>
        </div>
        <div className="progreso" aria-label={`Progreso: ${n} de 5 temas vistos`}>
          <div className="pbar"><i style={{ width: `${(n / 5) * 100}%` }} /></div>
          <span className="mono">{n}/5 temas vistos</span>
        </div>
      </section>
      <section className="wrap mapa-wrap">
        <Mapa vistos={vistos} onVisto={setVisto} onOpen={(id) => { location.hash = `#/presentacion?t=${id}`; }} />
      </section>
      <section className="wrap diag-list">
        <p className="eyebrow">Diagramas interactivos · hechos con Archify</p>
        {GRUPOS.map(([g, ds]) => (
          <div key={g} className="dl-grupo">
            <h3>{g}</h3>
            <div className="dl-grid">
              {ds.map(([f, t]) => <a key={f} className="dl-card" href={`${BASE}diagramas/${f}.html`} target="_blank" rel="noreferrer"><b>{t}</b><i className="mono">abrir ↗</i></a>)}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
