import { useEffect, useState } from 'react';

/** Receso con cuenta regresiva de 10 minutos (empieza al tocar el botón). */
export function Receso() {
  const [fin, setFin] = useState(null);
  const [ahora, setAhora] = useState(Date.now());
  useEffect(() => { if (!fin) return; const id = setInterval(() => setAhora(Date.now()), 500); return () => clearInterval(id); }, [fin]);
  const resta = fin ? Math.max(0, fin - ahora) : 10 * 60 * 1000;
  const mm = String(Math.floor(resta / 60000)).padStart(2, '0'), ss = String(Math.floor((resta % 60000) / 1000)).padStart(2, '0');
  return (
    <div className="d-break">
      <p className="d-eti">Minuto 60 · receso</p>
      <h1>Pausa de 10 minutos</h1>
      <p className="d-reloj mono" aria-live="polite">{mm}:{ss}</p>
      {!fin ? <button className="btn" onClick={() => setFin(Date.now() + 10 * 60 * 1000)}>Iniciar cuenta regresiva</button>
        : resta === 0 ? <p className="d-preg">¡Volvemos! Abran las actividades en su celular: la actividad 3 empieza ya.</p>
        : <p className="d-sub">Al volver: actividad 3 (5 min), el modelo C4 con zoom, diseño OO y patrones.</p>}
      <div className="d-break-tip">
        <span className="mono">Mientras tanto</span>
        <p>Si tuvieras que explicarle el Delivery System a alguien nuevo en 30 segundos, ¿qué dibujarías primero? Lo usaremos en el tema 3 (C4).</p>
      </div>
    </div>
  );
}

/** Línea de tiempo de la sesión de 120 minutos. */
export const AGENDA = [
  [0, 10, 'Inicio + Actividad 1', '#FF8A3D', 'a'], [10, 22, 'Tema 1 · Arquitectura de software', '#FF8A3D', 't'], [22, 45, 'Tema 2 · Vistas 4+1', '#C6F33A', 't'],
  [45, 60, 'Actividad 2', '#FFD166', 'a'], [60, 70, 'Receso', '#3A4152', 'b'], [70, 75, 'Actividad 3', '#FFD166', 'a'],
  [75, 95, 'Tema 3 · Modelo C4 + taller', '#6EA8FF', 't'], [95, 103, 'Tema 4 · Diseño OO', '#7FE3C4', 't'], [103, 113, 'Tema 5 · Patrones', '#B78CFF', 't'],
  [113, 118, 'Actividad 4', '#FFD166', 'a'], [118, 120, 'Cierre y podio', '#B78CFF', 'c'],
];
export function Agenda() {
  return (
    <div className="d-agenda">
      <div className="bar">
        {AGENDA.map(([a, b, t, c]) => <div key={a} style={{ flex: b - a, background: c }} title={`${a}–${b} min · ${t}`} />)}
      </div>
      <div className="rows">
        {AGENDA.map(([a, b, t, c, k]) => (
          <div key={a} className={`row ${k}`}><span className="mono">{String(a).padStart(3, '0')}–{String(b).padStart(3, '0')}</span><i style={{ background: c }} /><b>{t}</b></div>
        ))}
      </div>
    </div>
  );
}
