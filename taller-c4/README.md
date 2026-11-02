# Taller C4 · Nivel 3 de su módulo

**Desarrollo de Software 2 · Semana 6 · Capstone Delivery System**

Cada equipo dibuja el **diagrama C4 de componentes (nivel 3)** de su módulo, con el mismo esquema hexagonal que `user-module`. Tienen 10 minutos en clase y lo terminan para la wiki.

| Equipo | Módulo | Plantilla |
|---|---|---|
| A | delivery-module | `equipo-a-delivery-module.architecture.json` |
| B | order-module | `equipo-b-order-module.architecture.json` |
| C | catalog-module | `equipo-c-catalog-module.architecture.json` |
| D | payment-module | `equipo-d-payment-module.architecture.json` |

El ejemplo completo es `user-module`: [`../archify/c4-user-module.architecture.json`](../archify/c4-user-module.architecture.json).

## Qué debe tener el diagrama

1. **Título** con nivel y módulo: "C4 · Nivel 3 · order-module".
2. **Adaptadores de entrada:** los controladores JavaFX reales y, si su módulo implementa un contrato de core, su adaptador (`OrderServiceAdapter`, …).
3. **Casos de uso:** uno por requerimiento funcional, con el nombre de la clase.
4. **Dominio y puertos:** agregados, objetos valor y el puerto de repositorio.
5. **Adaptadores de salida:** memoria (y JPA cuando lo tengan).
6. **Contratos de core que usan**, con una flecha "usa" desde el caso de uso que los llama.
7. Cada flecha con **verbo** y una **leyenda**.

## Opción 1 · Con su agente de IA (Archify)

[Archify](https://archify.si) es una habilidad para agentes de IA que genera diagramas HTML interactivos.

```bash
# Claude Code (una vez)
npx -y skills@latest add https://archify.si --skill archify --agent claude-code --global --copy --yes
```

Luego pídanle al agente, desde la carpeta del capstone:

> Lee `order-module` y dibuja con Archify su diagrama C4 nivel 3 (arquitectura hexagonal), partiendo de `taller-c4/equipo-b-order-module.architecture.json`.

## Opción 2 · Sin agente (CLI de Archify)

```bash
git clone https://github.com/tt-a1i/archify
# Editen la plantilla: cambien cada "TODO" por los nombres reales de su código.
node archify/archify/bin/archify.mjs validate architecture equipo-b-order-module.architecture.json
node archify/archify/bin/archify.mjs render architecture equipo-b-order-module.architecture.json order-c4.html
```

`validate` les dice exactamente qué corregir (etiquetas largas, cajas fuera del lienzo, etc.).

## Opción 3 · Papel

Dibújenlo a mano con las mismas cajas y suban una foto. Después pásenlo a Archify para la wiki.

## Entrega

En la wiki de su módulo, **Modulos/&lt;módulo&gt;/Arquitectura**: el HTML (o captura) del nivel 3, el JSON fuente y dos líneas sobre qué contrato implementan y cuáles usan.
