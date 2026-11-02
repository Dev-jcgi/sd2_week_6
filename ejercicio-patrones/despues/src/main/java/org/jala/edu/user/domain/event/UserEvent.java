package org.jala.edu.user.domain.event;

import java.time.Instant;
import org.jala.edu.user.domain.model.UserId;

/**
 * Evento de dominio: un hecho que YA pasó en el módulo de usuarios (nombre en pasado).
 * sealed: solo estos tres tipos existen, así un switch sobre UserEvent sabe que los cubrió todos.
 */
public sealed interface UserEvent permits UserRegistered, UserDeactivated, UserRoleChanged {
    UserId userId();

    Instant occurredAt();
}
