package org.jala.edu.user.domain.event;

import java.time.Instant;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;

public record UserRoleChanged(UserId userId, UserRole from, UserRole to, Instant occurredAt) implements UserEvent {
}
