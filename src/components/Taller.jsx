import { EQUIPOS } from '../data/actividades.js';

const BASE = import.meta.env.BASE_URL;
const REPO = 'https://github.com/Dev-jcgi/sd2_week_6/tree/main';
const ARCH = { A: 'equipo-a-delivery-module', B: 'equipo-b-order-module', C: 'equipo-c-catalog-module', D: 'equipo-d-payment-module' };

/** Instrucciones del taller C4 y plantillas de Archify por equipo. */
export default function Taller() {
  return (
    <div className="page wrap doc-page">
      <p className="eyebrow">Tema 3 · Taller C4 · 10 min en clase</p>
      <h1 className="h-lg">Dibujen el nivel 3 de su módulo</h1>
      <p className="lead">Mismo esquema que user-module: adaptadores de entrada, casos de uso, dominio y puertos, adaptadores de salida y los contratos de core que usan.</p>
      <div className="equipos taller">
        {EQUIPOS.map((e) => (
          <div key={e.id} className="equipo" style={{ '--c': e.color }}>
            <b>{e.nombre}</b><span className="mono">{e.modulo}</span>
            <a href={`${BASE}taller/equipo-${e.id.toLowerCase()}.html`} target="_blank" rel="noreferrer">ver plantilla ↗</a>
            <a href={`${BASE}taller/${ARCH[e.id]}.architecture.json`} download>descargar JSON</a>
          </div>
        ))}
      </div>
      <div className="doc-cols">
        <section>
          <h2>Debe tener</h2>
          <ol>
            <li>Título con nivel y módulo.</li>
            <li>Controladores JavaFX reales y, si implementan un contrato de core, su adaptador.</li>
            <li>Un caso de uso por requerimiento funcional, con el nombre de la clase.</li>
            <li>Dominio (agregados, objetos valor) y el puerto de repositorio.</li>
            <li>Adaptador en memoria (y JPA cuando exista).</li>
            <li>Contratos de core que usan, con flecha “usa”.</li>
            <li>Verbos en las flechas y leyenda.</li>
          </ol>
          <p>Ejemplo completo: <a href={`${BASE}diagramas/c4-user-module.html`} target="_blank" rel="noreferrer">user-module nivel 3 ↗</a> · <a href={`${BASE}taller/ejemplo-user-module.architecture.json`} download>JSON</a></p>
        </section>
        <section>
          <h2>Cómo hacerlo con Archify</h2>
          <p><b>Con su agente de IA:</b> instalen la habilidad de <a href="https://archify.si" target="_blank" rel="noreferrer">archify.si</a> y pídanle que lea su módulo y complete la plantilla.</p>
          <pre className="mono cmd">npx -y skills@latest add https://archify.si --skill archify --agent claude-code --global --copy --yes</pre>
          <p><b>Sin agente:</b> editen el JSON (cambien cada TODO) y usen la CLI:</p>
          <pre className="mono cmd">{`git clone https://github.com/tt-a1i/archify
node archify/archify/bin/archify.mjs validate architecture plantilla.json
node archify/archify/bin/archify.mjs render architecture plantilla.json salida.html`}</pre>
          <p><b>Sin computadora:</b> en papel con las mismas cajas, y foto.</p>
          <p>Entrega en la wiki: <span className="mono">Modulos/&lt;módulo&gt;/Arquitectura</span>. <a href={`${REPO}/taller-c4`} target="_blank" rel="noreferrer">README en GitHub ↗</a></p>
        </section>
      </div>
    </div>
  );
}
