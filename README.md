# DS2 · Semana 6 · Arquitectura de software

**Desarrollo de Software 2 · Sección E · Capstone Delivery System**

Sesión de 2 horas con receso de 10 minutos. Todo es estático (GitHub Pages): no usa Firebase ni servidor.

| Parte | Ruta / carpeta | Qué es |
|---|---|---|
| Mapa C4 con zoom | `#/` | El Delivery System en el modelo C4 con vis-network. Empieza en el nivel 1 (una sola caja); **doble clic** baja a contenedores → componentes → user-module → código; doble clic en el fondo sube. Clic: abstracción C4, explicación, tema y diagrama de Archify. |
| Presentación 2D | `#/presentacion` | reveal.js: una columna por tema (→) y detalle hacia abajo (↓). **M** abre el mapa, **P** el marcador de equipos, **ESC** la vista general. `?t=t3` abre un tema y `?a=a2` una actividad. |
| Actividades | `#/actividades` | Cada estudiante elige su equipo (A–D) y responde en su celular con autocorrección. En la presentación, las mismas preguntas se proyectan para que los equipos compitan; el profesor suma puntos en el marcador (se guarda en su navegador). |
| Taller C4 | `#/taller`, `taller-c4/` | Plantillas de Archify por equipo para dibujar el nivel 3 de su módulo. |
| Ejercicio de patrones | `#/ejercicio`, `ejercicio-patrones/` | user-module **antes** (5 pruebas) y **después** (13 pruebas) de aplicar Builder, Factory y Observer. Java puro + JUnit 5. |
| Diagramas | `archify/` → `public/diagramas/` | 18 diagramas hechos con [Archify](https://archify.si): C4 (4 niveles), vistas 4+1, inversión de dependencias, patrones y la comparación antes/después de Observer. |

## Temas y agenda

| Min | Qué |
|---|---|
| 0–10 | Inicio + **Actividad 1 · Arquitecto por un día** |
| 10–22 | Tema 1 · Introducción a la arquitectura de software |
| 22–45 | Tema 2 · El modelo de vistas 4+1 |
| 45–60 | **Actividad 2 · ¿Qué vista es?** |
| 60–70 | Receso (diapositiva con cuenta regresiva) |
| 70–75 | **Actividad 3 · Zoom C4** |
| 75–95 | Tema 3 · El modelo C4 + taller C4 por equipo |
| 95–103 | Tema 4 · Revisión del diseño orientado a objetos (pilares y SOLID en user-module) |
| 103–113 | Tema 5 · Patrones de diseño: Factory, Builder y Observer + ejercicio |
| 113–118 | **Actividad 4 · Patrón detective** |
| 118–120 | Cierre y podio de equipos |

## Publicar en GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Cualquier push a `main` (o **Actions → Publicar en GitHub Pages → Run workflow**) publica el sitio en `https://<dominio>/sd2_week_6/`.

No hace falta configurar variables.

## Desarrollo local

```bash
npm install
npm run dev
```

## Regenerar los diagramas

```bash
git clone https://github.com/tt-a1i/archify
node archify/archify/bin/archify.mjs render architecture archify/c4-contexto.architecture.json public/diagramas/c4-contexto.html --quality showcase
# Comparación antes/después de Observer:
node archify/archify/bin/archify.mjs compare architecture archify/observer-antes.base.architecture.json archify/observer-despues.head.architecture.json public/diagramas/observer-comparacion.html
```

## Referencias

- Kruchten, P. (1995). Architectural Blueprints—The "4+1" View Model of Software Architecture. *IEEE Software*, 12(6), 42–50.
- Brown, S. *The C4 model for visualising software architecture*. https://c4model.com
- Bass, L., Clements, P. y Kazman, R. (2021). *Software Architecture in Practice* (4.ª ed.). Addison-Wesley.
- ISO/IEC/IEEE 42010:2022. *Software, systems and enterprise — Architecture description*.
- Gamma, E., Helm, R., Johnson, R. y Vlissides, J. (1994). *Design Patterns*. Addison-Wesley.
- Martin, R. C. (2000). *Design Principles and Design Patterns*.
