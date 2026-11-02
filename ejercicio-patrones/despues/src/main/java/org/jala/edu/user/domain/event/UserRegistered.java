package org.jala.edu.user.domain.event;

import java.time.Instant;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.UserId;

public record UserRegistered(UserId userId, Email email, String fullName, Instant occurredAt) implements UserEvent {
}
