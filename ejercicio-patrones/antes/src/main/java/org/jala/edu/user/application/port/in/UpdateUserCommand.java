package org.jala.edu.user.application.port.in;

import java.util.UUID;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;

public record UpdateUserCommand(UUID id, String firstName, String lastName, String phoneNumber,
                                UserRole role, UserStatus status) {
}
