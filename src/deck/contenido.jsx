import { T, Portada, Arch, Code, Cards, Card, YCapstone, QR } from './piezas.jsx';
import { Receso, Agenda } from './extras.jsx';
import { ACTIVIDADES } from '../data/actividades.js';
import Pregunta from '../components/Pregunta.jsx';
import Marcador from '../components/Marcador.jsx';

/* Presentación de la Semana 6 · Desarrollo de Software 2.
   Cada columna (→) es un tema o una actividad; sus diapositivas (↓) profundizan.
   Caso real: el capstone Delivery System (monolito modular, Java 25, Spring Boot, JavaFX). */

const REPO = 'https://github.com/Dev-jcgi/sd2_week_6/tree/main';
const Lista = ({ items, frag }) => <ul className="d-list">{items.map((x, i) => <li key={i} className={frag ? 'fragment' : ''}>{x}</li>)}</ul>;
const Tabla = ({ head, rows, small }) => (
  <table className={`d-tabla ${small ? 'sm' : ''}`}><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
);
const Dos = ({ children, r = '1fr 1fr' }) => <div className="d-dos" style={{ gridTemplateColumns: r }}>{children}</div>;
const Analogia = ({ titulo, children }) => <div className="d-analogia"><span className="mono">Analogía</span><h3>{titulo}</h3>{children}</div>;
const Cita = ({ children, fuente }) => <blockquote className="d-cita"><p>{children}</p><cite className="mono">{fuente}</cite></blockquote>;

/* ── Actividades: una diapositiva de presentación + una por pregunta (modo pantalla) ── */
function actividad(a) {
  return {
    id: a.id, titulo: `Actividad ${a.n}`, kind: 'act', act: a.id,
    slides: [
      <div className="d-act" style={{ '--c': a.color }} key="i">
        <p className="d-eti"><span className="pill">ACTIVIDAD {a.n} DE 4</span> {a.momento} · {a.min} min</p>
        <h1>{a.nombre}</h1>
        <Dos r="1.3fr 1fr">
          <div className="d-act-modos">
            <div><span className="mono">En tu celular</span><p>Escanea el código, elige tu equipo y responde: ves al momento si acertaste.</p></div>
            <div><span className="mono">En la pantalla</span><p>Cada equipo discute y responde en voz alta. El equipo que acierta suma puntos en el marcador.</p></div>
            <div className="d-act-items">{a.preguntas.map((q, i) => <div key={q.id}><span className="mono">{i + 1}</span><p>{q.q}</p></div>)}</div>
          </div>
          <div className="d-act-qr"><QR ruta={`#/actividades?a=${a.id}`} size={210} /><p className="mono">#/actividades · {a.nombre}</p><Marcador compact /></div>
        </Dos>
      </div>,
      ...a.preguntas.map((q) => (
        <div className="d-pant" key={q.id}>
          <Pregunta q={q} modo="pantalla" />
          <Marcador compact />
        </div>
      )),
    ],
  };
}
const ACT = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, actividad(a)]));

export const COLS = [
  /* ───────────── INICIO ───────────── */
  { id: 'inicio', titulo: 'Inicio', slides: [
    <div className="d-hero" key="p">
      <p className="d-eti">Desarrollo de Software 2 · Sección E · Semana 6</p>
      <h1>Arquitectura de <em>software</em></h1>
      <p className="d-preg">Hoy miramos el <b>Delivery System</b> como arquitectos: con vistas, con zoom y con patrones.</p>
      <div className="d-hero-tags mono"><span>4+1</span><span>C4</span><span>Diseño OO</span><span>Factory · Builder · Observer</span></div>
      <p className="d-nav mono">→ avanzar · ↓ profundizar · M mapa C4 · P marcador · ESC vista general</p>
    </div>,
    <>
      <T eti="Agenda">Dos horas, un sistema real</T>
      <Agenda />
      <p className="d-sub">Receso de 10 minutos a la mitad. Las actividades suman puntos por equipo: A, B, C y D.</p>
    </>,
    <>
      <T eti="Cómo se usa">El mapa C4 es la clase</T>
      <Dos r="1.1fr 1fr">
        <Lista items={[
          <>El mapa empieza en el <b>nivel 1</b>: el Delivery System es una sola caja.</>,
          <><b>Doble clic</b> en un elemento con borde azul: hace <b>zoom</b> al siguiente nivel (contenedores → componentes → user-module → código).</>,
          <>Clic: qué es, qué abstracción C4 es y en qué tema lo explicamos.</>,
          <>“Recorrer los 4 niveles” anima el zoom completo.</>,
        ]} />
        <Cards cols={1}>
          <Card t="Columna = tema" c="#C6F33A">→ para cambiar de tema.</Card>
          <Card t="Abajo = detalle" c="#6EA8FF">↓ para analogía, diagrama, código y “¿Y en el capstone?”.</Card>
          <Card t="Actividades" c="#FF8A3D">En tu celular (autocorrección) y por equipos en la pantalla.</Card>
        </Cards>
      </Dos>
    </>,
  ] },

  ACT.a1,

  /* ───────────── TEMA 1 · ARQUITECTURA ───────────── */
  { id: 't1', tema: 't1', titulo: 'Arquitectura', slides: [
    <Portada key="p" tema="t1" pregunta="¿Qué decisiones del Delivery System serían carísimas de cambiar en la semana 8?" />,
    <>
      <T tema="t1" eti="Analogía">El plano de la casa y el color de las paredes</T>
      <Dos>
        <Analogia titulo="Lo difícil de cambiar">
          <p>Pintar una pared cuesta una tarde. Mover la cocina al segundo piso cuesta tirar muros, mover tuberías y avisar a todos los que viven ahí.</p>
          <p className="fragment">La <b>arquitectura</b> son las decisiones tipo “dónde va la cocina”: estructurales, que afectan a todo y que cuesta mucho revertir.</p>
        </Analogia>
        <Cards cols={1}>
          <Card t="Arquitectura en el capstone" c="#FF8A3D" frag>Monolito modular · hexagonal · cada módulo depende solo de core · contratos entre módulos.</Card>
          <Card t="Diseño detallado" c="#7FE3C4" frag>Email como record · nombres de métodos · usar stream o for.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Definiciones">¿Qué es arquitectura de software?</T>
      <Dos>
        <div className="d-def">
          <Cita fuente="Bass, Clements y Kazman · Software Architecture in Practice, 4.ª ed. (2021)">El conjunto de estructuras necesarias para razonar sobre el sistema, que comprenden elementos de software, relaciones entre ellos y propiedades de ambos.</Cita>
          <Cita fuente="ISO/IEC/IEEE 42010:2022">Los conceptos o propiedades fundamentales de un sistema en su entorno, plasmados en sus elementos, relaciones y en los principios de su diseño y evolución.</Cita>
        </div>
        <div>
          <p className="d-eti">Vocabulario de ISO 42010</p>
          <Tabla small head={['Concepto', 'En el capstone']} rows={[
            ['Interesado (stakeholder)', 'PO, equipos A–D, practitioner, usuarios'],
            ['Preocupación (concern)', '¿Los equipos trabajan sin pisarse?'],
            ['Punto de vista', 'Reglas para dibujar, p. ej. “vista de desarrollo”'],
            ['Vista', 'El diagrama de módulos Maven'],
            ['Justificación (rationale)', 'Decisiones D-00 a D-09'],
          ]} />
        </div>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Arquitectura vs. diseño">¿Cómo saber si una decisión es arquitectónica?</T>
      <Tabla head={['Pregunta', 'Si la respuesta es sí…', 'Ejemplo del capstone']} rows={[
        ['¿Cuesta mucho cambiarla después?', 'arquitectura', 'Monolito modular en vez de microservicios'],
        ['¿Afecta a varios módulos o equipos?', 'arquitectura', 'Contratos en core-module (D-00)'],
        ['¿Decide un atributo de calidad?', 'arquitectura', 'Memoria por defecto, MySQL opcional (pruebas rápidas)'],
        ['¿Se queda dentro de una clase?', 'diseño detallado', 'Email valida su formato en el constructor'],
        ['¿Se puede cambiar en una tarde sin avisar a nadie?', 'diseño detallado', 'Renombrar un método privado'],
      ]} />
      <p className="d-sub fragment">Perry y Wolf (1992): arquitectura = <b>elementos + forma + razón</b>. La razón (el porqué) es lo que más se olvida documentar.</p>
    </>,
    <>
      <T tema="t1" eti="Estilos">Los estilos que usa el capstone</T>
      <Dos r="1fr 1.1fr">
        <Cards cols={1}>
          <Card t="Monolito modular" c="#FF8A3D">Un solo ejecutable, pero dividido en módulos con fronteras claras. Más simple de desplegar que microservicios.</Card>
          <Card t="Hexagonal (puertos y adaptadores)" c="#6EA8FF">El dominio en el centro; la UI, la base de datos y otros módulos son adaptadores intercambiables.</Card>
          <Card t="Por capas dentro de cada módulo" c="#7FE3C4">domain → application → infrastructure: las dependencias apuntan hacia adentro.</Card>
        </Cards>
        <Code small titulo="core-module · el contrato que protege la frontera">{`
package org.jala.edu.core.contract;

/**
 * Contrato de usuarios para los demás módulos (D-00, D-07).
 * Entre módulos solo viajan UUID y records.
 */
public interface UserService {
    boolean isActiveWithRole(UUID userId, UserRole... roles);
}

// order-module · AddProductToCartUseCase (código real del equipo B):
// usa el contrato sin conocer ninguna clase de user-module
if (!users.isActiveWithRole(customerId, UserRole.CUSTOMER)) {
    throw new DomainException("User not authorized for this operation");
}`}</Code>
      </Dos>
    </>,
    <YCapstone key="y" tema="t1" items={[
      ['…un equipo quiere usar directamente las entidades JPA de otro módulo?', 'Pedir lo que necesita por el contrato de core (UUID y records). Si falta un método, se propone en una decisión nueva.'],
      ['…el PO pregunta “¿por qué no microservicios?”', 'Responder con la razón: un equipo por módulo, una sola app de escritorio y sin infraestructura de red que mantener.'],
      ['…nadie recuerda por qué el código de confirmación son 4 caracteres?', 'Por eso existe la decisión D-02 escrita: la arquitectura incluye su justificación.'],
    ]} tarea="agreguen a la wiki de su módulo una sección “Decisiones de arquitectura” con las decisiones D-xx que les afectan y su porqué." />,
  ] },

  /* ───────────── TEMA 2 · 4+1 ───────────── */
  { id: 't2', tema: 't2', titulo: 'Vistas 4+1', slides: [
    <Portada key="p" tema="t2" pregunta="¿Un solo diagrama le sirve al cliente, al developer y a quien instala el sistema?" />,
    <>
      <T tema="t2" eti="Analogía">Los planos de un edificio</T>
      <Dos>
        <Analogia titulo="Un edificio, varios planos">
          <p>El arquitecto entrega planos distintos: distribución de espacios, instalación eléctrica, estructura y ubicación en el terreno. Cada especialista lee el suyo.</p>
          <p className="fragment">Y todos se validan con <b>recorridos</b>: “una persona entra, sube al tercer piso y abre la llave”. Si el recorrido no cuadra con algún plano, hay un error.</p>
        </Analogia>
        <Cita fuente="Kruchten · IEEE Software 12(6), 1995">La arquitectura se describe con cinco vistas concurrentes; cada una atiende las preocupaciones de un grupo de interesados.</Cita>
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Panorama">Cinco vistas, cinco públicos</T>
      <Tabla head={['Vista', 'Preocupación', 'Interesados', 'En el capstone']} rows={[
        ['Lógica', 'Funcionalidad: qué ofrece el sistema', 'Usuarios finales, analistas', 'User, Commerce, Product, Order, Delivery'],
        ['Procesos', 'Concurrencia, rendimiento, disponibilidad', 'Integradores', 'Hilo de JavaFX y BackgroundTasks'],
        ['Desarrollo', 'Organización del código y del trabajo', 'Developers, PO', '7 proyectos Maven y capas hexagonales'],
        ['Física', 'Dónde corre cada cosa', 'Quien instala y opera', 'JVM, contenedor MySQL, GitLab CI'],
        ['Escenarios (+1)', 'Validar que las 4 encajan', 'Todos', 'Un pedido de punta a punta'],
      ]} />
    </>,
    <>
      <T tema="t2" eti="Vista lógica · Archify">Las abstracciones del dominio</T>
      <Arch src="v41-logica" h={640} nota="Entre módulos solo se guardan UUID: Cart conoce customerId, no la clase User" />
    </>,
    <>
      <T tema="t2" eti="Vista de procesos · Archify">Qué corre y en qué hilo</T>
      <Dos r="1.1fr 1fr">
        <Arch src="v41-procesos" h={600} />
        <Code small titulo="user-module · CreateUserController (código real)">{`
// El caso de uso NO corre en el hilo de JavaFX:
// BackgroundTasks usa un hilo virtual y vuelve a la UI.
form.setDisable(true);
BackgroundTasks.run(
        () -> createUserUseCase.execute(command), // hilo de trabajo
        userId -> {                                // de vuelta en JavaFX
            clearForm();
            form.setDisable(false);
        },
        error -> {
            showMessage(ErrorMessages.of(error, "create"), "error");
            form.setDisable(false);
        });`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Vista de desarrollo · Archify">Cómo está organizado el código</T>
      <Dos r="1.4fr 1fr">
        <Arch src="v41-desarrollo" h={600} />
        <Lista frag items={[
          <>Cada módulo es un <b>proyecto Maven</b>: se compila y prueba solo.</>,
          <>Regla de dependencias: módulo → <b>core-module</b>, nunca módulo → módulo.</>,
          <>Dentro: <b>domain</b>, <b>application</b>, <b>infrastructure</b>.</>,
          <>Esta vista es la que reparte el trabajo: un equipo por módulo.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Vista física · Archify">Dónde corre cada pieza</T>
      <Dos r="1.4fr 1fr">
        <Arch src="v41-fisica" h={600} />
        <Code small lang="yaml" titulo="delivery-system/docker-compose.yml">{`
services:
  mysql:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: delivery_system
      MYSQL_USER: delivery
    ports:
      - "3306:3306"
    volumes:
      - delivery-system-mysql-data:/var/lib/mysql`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Escenarios (+1) · Archify">Un pedido que atraviesa las cuatro vistas</T>
      <Arch src="v41-escenarios" h={640} nota="Cada paso usa un contrato y una decisión (D-01, D-02, D-04, D-08, D-09)" />
    </>,
    <YCapstone key="y" tema="t2" items={[
      ['…el Sprint Review es con el cliente y muestran el diagrama de paquetes?', 'Mostrar la vista lógica o un escenario: el cliente piensa en pedidos, no en paquetes.'],
      ['…dos repartidores toman el mismo pedido a la vez?', 'Es un tema de la vista de procesos: definir la exclusividad (FUN-002 de entregas) y probarla.'],
      ['…el pipeline pasa en GitLab pero en su laptop falla MySQL?', 'Revisar la vista física: perfil memory vs jpa, Docker Compose y puertos.'],
    ]} tarea="elijan un escenario de su módulo y escríbanlo paso a paso en la wiki indicando qué contrato y qué decisión usa cada paso." />,
  ] },

  { ...ACT.a2, slides: [...ACT.a2.slides, <Receso key="r" />] },

  ACT.a3,

  /* ───────────── TEMA 3 · C4 ───────────── */
  { id: 't3', tema: 't3', titulo: 'Modelo C4', slides: [
    <Portada key="p" tema="t3" pregunta="¿Cómo le explicas el Delivery System a alguien nuevo en 30 segundos… y a un developer en 30 minutos?" />,
    <>
      <T tema="t3" eti="Analogía">Google Maps para el código</T>
      <Dos>
        <Analogia titulo="Del país a la calle">
          <p>En un mapa ves el país, luego la ciudad, luego el barrio y luego la calle. Cada zoom muestra <b>menos área y más detalle</b>, y nunca mezcla niveles.</p>
          <p className="fragment">C4 (Simon Brown) hace eso con el software: <b>Contexto → Contenedores → Componentes → Código</b>. Es independiente de la notación y de la herramienta.</p>
        </Analogia>
        <Cards cols={2}>
          <Card t="Persona" c="#9AA3B2" frag>Quien usa el sistema: cliente, comercio, repartidor, administrador.</Card>
          <Card t="Sistema" c="#15A26B" frag>Lo que entrega valor: el Delivery System.</Card>
          <Card t="Contenedor" c="#0E9DB0" frag>Algo que se ejecuta o guarda datos: la app JavaFX, MySQL. <b>No es Docker.</b></Card>
          <Card t="Componente" c="#D9930F" frag>Agrupación dentro de un contenedor: cada módulo Maven.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Nivel 1 · Contexto">¿Quién lo usa y con qué habla?</T>
      <Arch src="c4-contexto" h={640} nota="Público: todos, incluido el cliente. Sin tecnología" />
    </>,
    <>
      <T tema="t3" eti="Nivel 2 · Contenedores">¿Qué se ejecuta y dónde están los datos?</T>
      <Arch src="c4-contenedores" h={640} nota="Un monolito modular tiene UN contenedor de aplicación" />
    </>,
    <>
      <T tema="t3" eti="Nivel 3 · Componentes">Los módulos y sus contratos</T>
      <Arch src="c4-componentes" h={640} nota="Todos los módulos dependen solo de core-module" />
    </>,
    <>
      <T tema="t3" eti="Nivel 3 · Zoom en user-module">Hexagonal por dentro</T>
      <Arch src="c4-user-module" h={640} nota="Adaptadores de entrada, aplicación, dominio y adaptadores de salida" />
    </>,
    <>
      <T tema="t3" eti="Nivel 4 · Código">Solo para lo importante</T>
      <Arch src="c4-codigo" h={640} nota="Opcional: se dibuja para el agregado clave o se genera desde el IDE" />
    </>,
    <>
      <T tema="t3" eti="Buenas prácticas">Un diagrama C4 que se entiende solo</T>
      <Dos>
        <Lista items={[
          <>Cada diagrama tiene <b>título</b> con su nivel y alcance.</>,
          <>Cada caja dice <b>qué es</b> (tipo) y <b>qué hace</b>, no solo su nombre.</>,
          <>Cada flecha tiene <b>verbo</b>: “usa OrderService”, no una línea muda.</>,
          <><b>Leyenda</b> con colores y formas.</>,
          <>No mezclar niveles: un módulo no aparece junto a “MySQL” en el contexto.</>,
        ]} />
        <Tabla small head={['', '4+1', 'C4']} rows={[
          ['Organiza por', 'Preocupaciones (vistas)', 'Zoom (niveles)'],
          ['Notación', 'Una por vista (UML)', 'Libre, con leyenda'],
          ['Fuerte en', 'Concurrencia, despliegue, escenarios', 'Estructura estática y comunicación'],
          ['En el capstone', 'Validar con escenarios', 'Wiki y onboarding de equipos'],
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Taller C4 · 10 min">Cada equipo dibuja SU módulo</T>
      <Dos r="1.1fr 1fr">
        <div>
          <Lista items={[
            <><b>Equipo A</b> delivery-module · <b>B</b> order-module · <b>C</b> catalog-module · <b>D</b> payment-module.</>,
            <>Dibujen el <b>nivel 3</b> de su módulo con el mismo esquema que user-module: adaptadores de entrada, casos de uso, puertos, dominio y adaptadores de salida.</>,
            <>Marquen qué contratos de core <b>implementan</b> y cuáles <b>usan</b>.</>,
            <>Usen la plantilla de Archify de su equipo (carpeta <span className="mono">taller-c4</span>) o papel y foto.</>,
          ]} />
          <p className="d-sub">Al terminar: 1 minuto por equipo para explicarlo. El mejor explicado suma 100 puntos.</p>
        </div>
        <div className="d-act-qr"><QR ruta="#/taller" size={220} /><p className="mono">#/taller · instrucciones y plantillas</p><Marcador compact /></div>
      </Dos>
    </>,
    <YCapstone key="y" tema="t3" items={[
      ['…llega un developer nuevo al equipo B a mitad del sprint?', 'Le muestran el nivel 1 y el nivel 3 de order-module antes de abrir el IDE.'],
      ['…la wiki tiene un diagrama con módulos, tablas de MySQL y personas mezclados?', 'Separarlo en niveles: contexto, contenedores y componentes, cada uno con leyenda.'],
      ['…el diagrama ya no coincide con el código?', 'Diagramas como código (Archify, Structurizr): viven en el repo y se revisan en el MR.'],
    ]} tarea="publiquen en la wiki (Modulos/<módulo>) el diagrama C4 nivel 3 de su módulo y el nivel 1 del sistema, con título y leyenda." />,
  ] },

  /* ───────────── TEMA 4 · OOD ───────────── */
  { id: 't4', tema: 't4', titulo: 'OOD', slides: [
    <Portada key="p" tema="t4" pregunta="¿Dónde están los cuatro pilares de la orientación a objetos dentro de user-module?" />,
    <>
      <T tema="t4" eti="Pilares en el código real">Los cuatro pilares, en user-module</T>
      <Dos>
        <Code small titulo="Encapsulamiento · Email (record)">{`
public record Email(String value) {
    public Email {
        if (value == null || !PATTERN.matcher(value.strip()).matches()) {
            throw new DomainException("Invalid email address: " + value);
        }
        value = value.strip().toLowerCase(Locale.ROOT);
    }
}`}</Code>
        <Code small titulo="Herencia · Polimorfismo · Abstracción">{`
// Herencia: id, fechas e igualdad para todos los agregados
public class User extends BaseModel<UserId> { ... }

// Abstracción + polimorfismo: un contrato, muchos casos de uso
public interface UseCase<Input, Output> {
    Output execute(Input input);
}
public class CreateUserUseCase
        implements UseCase<CreateUserCommand, UUID> { ... }

// Comportamiento, no setters: el estado cambia con intención
user.deactivate();`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t4" eti="SOLID">Los cinco principios en el capstone</T>
      <Tabla head={['Principio', 'Idea', 'Dónde se ve']} rows={[
        ['S · Responsabilidad única', 'Una razón para cambiar', 'Un caso de uso por requerimiento funcional'],
        ['O · Abierto/cerrado', 'Extender sin modificar', 'Nuevo listener sin tocar UpdateUserUseCase (tema 5)'],
        ['L · Sustitución de Liskov', 'Las implementaciones son intercambiables', 'Memoria o JPA: los tests no cambian'],
        ['I · Segregación de interfaces', 'Interfaces pequeñas', 'UserService tiene un solo método'],
        ['D · Inversión de dependencias', 'Depender de abstracciones', 'Casos de uso → UserRepositoryPort'],
      ]} />
      <p className="d-sub">Robert C. Martin, “Design Principles and Design Patterns” (2000).</p>
    </>,
    <>
      <T tema="t4" eti="Inversión de dependencias · Archify">El puerto que permite cambiar la base de datos</T>
      <Arch src="ood-dip" h={620} nota="UpdateUserUseCase no sabe si los datos están en memoria o en MySQL" />
    </>,
    <YCapstone key="y" tema="t4" items={[
      ['…la entidad JPA tiene setters públicos y la UI los llama directamente?', 'Separar entidad JPA y modelo de dominio con un mapper, como UserPersistenceMapper.'],
      ['…un caso de uso valida, guarda, manda correo y registra auditoría?', 'Demasiadas responsabilidades: separar con eventos (Observer, tema 5).'],
      ['…las pruebas necesitan MySQL encendido?', 'Probar casos de uso con el adaptador en memoria: eso permite la inversión de dependencias.'],
    ]} tarea="revisen una clase de su módulo con la tabla SOLID y anoten en la wiki un principio que cumpla y uno que podría mejorar." />,
  ] },

  /* ───────────── TEMA 5 · PATRONES ───────────── */
  { id: 't5', tema: 't5', titulo: 'Patrones', slides: [
    <Portada key="p" tema="t5" pregunta="¿Cuántas veces vamos a escribir la misma solución antes de darle un nombre?" />,
    <>
      <T tema="t5" eti="Qué es un patrón">Soluciones con nombre para problemas que se repiten</T>
      <Dos>
        <Analogia titulo="La receta de la abuela">
          <p>Un patrón no es código para copiar: es una receta probada con nombre, problema, solución y consecuencias. Decir “usa un Builder” ahorra media hora de explicación.</p>
        </Analogia>
        <Tabla small head={['Familia (GoF, 1994)', 'Para qué', 'Hoy']} rows={[
          ['Creacionales', 'Cómo se crean los objetos', 'Factory, Builder'],
          ['Estructurales', 'Cómo se combinan', 'Adapter: ¡ya existe! UserServiceAdapter'],
          ['De comportamiento', 'Cómo se comunican', 'Observer'],
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t5" eti="Antes · Archify">Tres olores de diseño en user-module</T>
      <Dos r="1.4fr 1fr">
        <Arch src="patrones-antes" h={600} />
        <Code small titulo="antes · SampleUsersLoader">{`
store(User.restore(new UserId(ADMIN),
        "Sample", "Admin",
        new Email("admin@sample.delivery"),
        null,                 // ¿teléfono?
        UserRole.ADMIN, UserStatus.ACTIVE,
        now, now));           // ¿cuál es cuál?`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t5" eti="Builder + Factory · Archify">Crear usuarios sin errores y en un solo lugar</T>
      <Dos r="1.2fr 1fr">
        <Arch src="patrones-builder-factory" h={600} />
        <Code small titulo="después · Builder y Factory">{`
User courier = User.builder()
        .id(new UserId(COURIER))
        .firstName("Sample").lastName("Courier")
        .email("courier@sample.delivery")
        .role(UserRole.COURIER)
        .build();            // valida igual que antes

public User create(CreateUserCommand command) {  // UserFactory
    Email email = new Email(command.email());
    if (userRepository.existsByEmail(email)) {
        throw new EmailAlreadyRegisteredException(email);
    }
    return User.register(...);
}`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t5" eti="Observer · Archify">El caso de uso publica; los interesados escuchan</T>
      <Arch src="observer-comparacion" h={660} nota="Archify compara antes y después: cambia a Before / Delta / After" />
    </>,
    <>
      <T tema="t5" eti="Observer en código">Dos dependencias en lugar de cuatro</T>
      <Dos>
        <Code small titulo="después · UpdateUserUseCase">{`
public Void execute(UpdateUserCommand command) {
    User user = userRepository.findById(id).orElseThrow(...);
    user.updateProfile(...);
    user.changeRole(command.role());
    if (command.status() == UserStatus.ACTIVE) user.activate();
    else user.deactivate();      // anota UserDeactivated
    userRepository.save(user);
    eventPublisher.publishAll(user.pullEvents());
    return null;
}`}</Code>
        <Code small titulo="después · un listener (Observer)">{`
public class CourierReleaseListener implements UserEventListener {
    @Override
    public void on(UserEvent event) {
        if (event instanceof UserDeactivated e
                && e.role() == UserRole.COURIER) {
            releaser.releaseAssignmentsOf(e.userId().value());
        }
    }
}
// UserModule: eventBus.subscribe(new CourierReleaseListener(...));`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t5" eti="Ejercicio de la semana">Antes y después, con pruebas</T>
      <Dos r="1.2fr 1fr">
        <div>
          <Lista items={[
            <><span className="mono">ejercicio-patrones/antes</span>: copia reducida de user-module con los tres olores (5 pruebas).</>,
            <><span className="mono">ejercicio-patrones/despues</span>: Builder, Factory y Observer aplicados (13 pruebas).</>,
            <>Java puro + JUnit 5: <span className="mono">mvn test</span>. Sin Spring ni JavaFX para enfocarse en el diseño.</>,
            <>Paso a paso en el README: Builder (15 min), Factory (15), Observer (30), comparar (10).</>,
          ]} />
          <p className="d-sub">Entrega en la wiki: captura de pruebas en verde, diagramas antes/después de una clase de su módulo y respuestas del paso 4.</p>
        </div>
        <div className="d-act-qr"><QR ruta="#/ejercicio" size={220} /><p className="mono"><a href={`${REPO}/ejercicio-patrones`} target="_blank" rel="noreferrer">github · ejercicio-patrones ↗</a></p></div>
      </Dos>
    </>,
    <YCapstone key="y" tema="t5" items={[
      ['…el equipo A necesita liberar entregas cuando se desactiva un repartidor?', 'Escuchar el evento UserDeactivated (record en core-module) con un listener en delivery-module.'],
      ['…crear un Order de prueba necesita 8 parámetros?', 'Un Builder para Order en las pruebas y en el mapper de persistencia.'],
      ['…aplicar patrones “por si acaso”?', 'No: un patrón se justifica con un olor real. Sin problema, el patrón es complejidad gratis.'],
    ]} tarea="hagan el ejercicio y propongan en su módulo UNA clase donde un patrón resolvería un olor real, con su diagrama antes/después." />,
  ] },

  ACT.a4,

  /* ───────────── CIERRE ───────────── */
  { id: 'cierre', titulo: 'Cierre', slides: [
    <>
      <T eti="Cierre">Cinco ideas para llevarse</T>
      <div className="d-ocho cinco">
        {[
          ['01', 'Arquitectura = decisiones difíciles de cambiar, con su porqué.', '#FF8A3D'],
          ['02', '4+1: una vista por preocupación, validadas con escenarios.', '#C6F33A'],
          ['03', 'C4: zoom de contexto a código, sin mezclar niveles.', '#6EA8FF'],
          ['04', 'OOD y SOLID ya viven en user-module: encapsulamiento y puertos.', '#7FE3C4'],
          ['05', 'Un patrón resuelve un olor real: Builder, Factory, Observer.', '#B78CFF'],
        ].map(([n, t, c]) => <div key={n} className="fragment" style={{ borderColor: c }}><span className="mono" style={{ color: c }}>{n}</span><p>{t}</p></div>)}
      </div>
    </>,
    <>
      <T eti="Para la semana">Entregables</T>
      <Dos>
        <Lista items={[
          <>Taller C4: nivel 1 del sistema y nivel 3 de su módulo en la wiki.</>,
          <>Escenario de su módulo con contratos y decisiones (vista +1).</>,
          <>Ejercicio de patrones: pruebas en verde y respuestas.</>,
          <>Una clase de su módulo con diagrama antes/después del patrón propuesto.</>,
        ]} />
        <div>
          <p className="d-eti">Referencias</p>
          <ul className="d-refs">
            <li>Kruchten, P. (1995). The 4+1 View Model of Architecture. IEEE Software, 12(6), 42–50.</li>
            <li>Brown, S. The C4 model for visualising software architecture. c4model.com</li>
            <li>Bass, L., Clements, P. y Kazman, R. (2021). Software Architecture in Practice, 4.ª ed.</li>
            <li>ISO/IEC/IEEE 42010:2022 · Architecture description.</li>
            <li>Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). Design Patterns.</li>
            <li>Martin, R. C. (2000). Design Principles and Design Patterns.</li>
          </ul>
        </div>
      </Dos>
    </>,
    <div className="d-final" key="f">
      <p className="d-eti">Marcador final</p>
      <h1>¡Gracias! <em>Podio</em> de equipos</h1>
      <Marcador />
    </div>,
  ] },
];

export const TEMA_COL = Object.fromEntries(COLS.map((c, i) => [c.tema, i]).filter(([k]) => k));
export const ACT_COL = Object.fromEntries(COLS.map((c, i) => [c.act, i]).filter(([k]) => k));
