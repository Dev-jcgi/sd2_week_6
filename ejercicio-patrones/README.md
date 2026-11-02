# Ejercicio · Patrones de diseño en `user-module`

**Desarrollo de Software 2 · Semana 6 · Capstone Delivery System**

Vas a mejorar el diseño de una copia reducida de `user-module` aplicando tres patrones de diseño (GoF):

| Patrón | Tipo | Problema que resuelve aquí |
|---|---|---|
| **Builder** | Creacional | `User.restore(...)` recibe 9 parámetros, varios del mismo tipo: es fácil invertirlos y obliga a pasar `null`. |
| **Factory** | Creacional | La regla "el correo no se repite" vive dentro de `CreateUserUseCase`; cualquier otro caso de uso que cree usuarios la copiaría. |
| **Observer** | De comportamiento | `UpdateUserUseCase` llama directamente a correo, auditoría y entregas. Cada interesado nuevo obliga a modificar el caso de uso. |

Las dos carpetas son proyectos Maven independientes, en Java puro con JUnit 5. No usan Spring ni JavaFX, para concentrarse en el diseño:

```
ejercicio-patrones/
├─ antes/     ← punto de partida (con los "olores" de diseño)  · 5 pruebas
└─ despues/   ← solución de referencia (Builder, Factory, Observer) · 13 pruebas
```

Los diagramas de antes y después están en el sitio de la clase, en **Diagramas → Ejercicio** (hechos con [Archify](https://archify.si)).

## Cómo correrlo

Necesitas JDK 21 o superior (el del capstone, JDK 25, sirve) y Maven.

```bash
cd ejercicio-patrones/antes
mvn test                 # o: ../../<ruta-al-capstone>/delivery-system/mvnw -f pom.xml test
```

Las 5 pruebas de `antes` deben pasar **antes y después** de tu refactorización: eso demuestra que mejoraste el diseño sin cambiar el comportamiento.

## Paso a paso

Trabaja sobre una copia de `antes/`. Después de cada paso corre `mvn test`.

### Paso 1 · Builder (15 min)

1. Lee `User.restore(...)` y `SampleUsersLoader.load()`. ¿Cuántos `null` y valores repetidos ves?
2. Crea la clase anidada `User.Builder` con un método por campo (`firstName("Ana")`, `role(...)`, …) y `build()`.
3. Pon valores por defecto: id nuevo, rol `CUSTOMER`, estado `ACTIVE`, fechas = ahora.
4. `build()` debe validar igual que el constructor (nombre y apellido no vacíos, correo obligatorio).
5. Haz que `register(...)` use el builder y reemplaza `restore(...)` en las pruebas.

✔ Listo cuando `User.builder().firstName("Ana").lastName("Perez").email("ana@mail.com").build()` crea un usuario activo.

### Paso 2 · Factory (15 min)

1. Crea `application/factory/UserFactory` con dos métodos:
   - `create(CreateUserCommand)`: convierte el correo, rechaza duplicados y llama a `User.register(...)`.
   - `sample(UUID id, String lastName, String email, UserRole, UserStatus)`: arma un usuario de prueba con el builder.
2. `CreateUserUseCase` ahora recibe la fábrica y ya no tiene `newModel(...)`.
3. `SampleUsersLoader` usa `userFactory.sample(...)`: cada usuario de prueba queda en una sola línea.

✔ Listo cuando no queda lógica de creación en los casos de uso.

### Paso 3 · Observer (30 min)

1. **Eventos de dominio** en `domain/event`: `UserEvent` (interfaz `sealed`) y los records `UserRegistered`, `UserDeactivated`, `UserRoleChanged`. Los nombres van en pasado: son hechos que ya pasaron.
2. **El agregado anota** sus eventos: `register` anota `UserRegistered`, `deactivate` anota `UserDeactivated` y `changeRole` anota `UserRoleChanged`. Agrega `pullEvents()`, que los entrega y los borra.
3. **Puertos** en `application/port/out`: `UserEventPublisher` (publica) y `UserEventListener` (escucha).
4. **Casos de uso**: después de `save(...)` llaman a `eventPublisher.publishAll(user.pullEvents())`. Quita `EmailNotifier`, `AuditLog` y `CourierAssignmentReleaser` de sus constructores.
5. **Infraestructura**: `InMemoryUserEventBus` (lista de suscriptores) y tres listeners: `WelcomeEmailListener`, `AuditLogListener` y `CourierReleaseListener`.
6. **Raíz de composición** `UserModule`: crea todo y suscribe los listeners. Es el único lugar que conoce las clases concretas.

✔ Listo cuando `UpdateUserUseCase` depende solo de `UserRepositoryPort` y `UserEventPublisher`.

### Paso 4 · Compara (10 min)

```bash
diff -r antes/src despues/src | less
```

Compara tu versión con `despues/` y responde en la wiki de tu equipo:

1. ¿Qué principio SOLID mejora cada patrón? Pista: Builder → legibilidad y menos errores; Factory → SRP; Observer → OCP y DIP.
2. Si mañana el módulo de pagos quiere enterarse cuando se desactiva un usuario, ¿qué archivo cambias en `antes` y cuál en `despues`?
3. ¿Qué costo agrega Observer? Pista: el flujo ya no se lee en un solo archivo y el orden de los listeners importa.

## Cómo llevarlo al capstone

| En el ejercicio | En el capstone (Spring Boot) |
|---|---|
| `InMemoryUserEventBus` | `ApplicationEventPublisher` de Spring |
| `UserEventListener` | Método con `@EventListener` o `@TransactionalEventListener` |
| `UserModule` | `UserModuleConfiguration` con `@Bean` |
| `CourierReleaseListener` | Viviría en `delivery-module`, escuchando un evento cuyo record esté en `core-module` (regla: entre módulos solo viajan UUID y records) |

## Entregable

En la wiki de tu equipo (**Modulos/&lt;módulo&gt;/Patrones**):

- Captura de `mvn test` en verde de tu versión.
- Los dos diagramas (antes y después) de **una** clase de tu propio módulo donde aplicarías Builder, Factory u Observer, con una frase de por qué.
- Las respuestas del paso 4.
