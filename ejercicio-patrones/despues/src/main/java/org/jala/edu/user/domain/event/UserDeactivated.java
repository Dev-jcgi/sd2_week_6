package org.jala.edu.user.domain.event;

import java.time.Instant;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;

public record UserDeactivated(UserId userId, Email email, String fullName, UserRole role, Instant occurredAt)
        implements UserEvent {
}
