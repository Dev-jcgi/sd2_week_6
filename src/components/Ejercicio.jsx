const BASE = import.meta.env.BASE_URL;
const REPO = 'https://github.com/Dev-jcgi/sd2_week_6/tree/main/ejercicio-patrones';
const PASOS = [
  ['Builder', '15 min', 'Crea User.Builder con un método por campo, valores por defecto (id nuevo, CUSTOMER, ACTIVE, fechas = ahora) y build() que valida. Reemplaza restore(…) de 9 parámetros.', 'patrones-builder-factory'],
  ['Factory', '15 min', 'Crea UserFactory con create(CreateUserCommand) (correo único + register) y sample(…) para los usuarios de prueba. CreateUserUseCase y SampleUsersLoader la usan.', 'patrones-builder-factory'],
  ['Observer', '30 min', 'Eventos UserRegistered, UserDeactivated y UserRoleChanged; el agregado los anota; los casos de uso los publican; InMemoryUserEventBus avisa a tres listeners suscritos en UserModule.', 'patrones-observer'],
  ['Comparar', '10 min', 'diff -r antes/src despues/src y responde en la wiki: qué principio SOLID mejora cada patrón y qué archivo cambias si pagos quiere enterarse de una desactivación.', 'observer-comparacion'],
];

/** Guía del ejercicio de patrones (antes/después) sobre user-module. */
export default function Ejercicio() {
  return (
    <div className="page wrap doc-page">
      <p className="eyebrow">Tema 5 · Ejercicio de la semana</p>
      <h1 className="h-lg">Factory, Builder y Observer en user-module</h1>
      <p className="lead">Dos proyectos Maven en Java puro: <b>antes</b> (con tres olores de diseño, 5 pruebas) y <b>después</b> (los patrones aplicados, 13 pruebas). Trabaja sobre una copia de <span className="mono">antes</span> y corre <span className="mono">mvn test</span> después de cada paso.</p>
      <div className="cta">
        <a className="btn" href={REPO} target="_blank" rel="noreferrer">Código en GitHub ↗</a>
        <a className="btn ghost" href={`${BASE}diagramas/patrones-antes.html`} target="_blank" rel="noreferrer">Diagrama · antes ↗</a>
        <a className="btn ghost" href={`${BASE}diagramas/observer-secuencia.html`} target="_blank" rel="noreferrer">Observer en secuencia ↗</a>
      </div>
      <ol className="pasos">
        {PASOS.map(([t, m, d, g], i) => (
          <li key={t}><span className="mono">Paso {i + 1} · {m}</span><h3>{t}</h3><p>{d}</p>
            <a href={`${BASE}diagramas/${g}.html`} target="_blank" rel="noreferrer">ver diagrama ↗</a></li>
        ))}
      </ol>
      <figure className="d-arch big">
        <iframe src={`${BASE}diagramas/observer-comparacion.html`} title="Observer antes y después" style={{ height: 620 }} loading="lazy" />
        <figcaption className="mono">Archify compara la versión antes y después: usa Before / Delta / After.</figcaption>
      </figure>
      <p className="note">Entrega en la wiki de tu equipo (Modulos/&lt;módulo&gt;/Patrones): captura de las pruebas en verde, los diagramas antes/después de una clase de tu módulo donde aplicarías uno de estos patrones y las respuestas del paso 4.</p>
    </div>
  );
}
