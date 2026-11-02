package org.jala.edu.user.application.usecase;

import org.jala.edu.core.application.usecase.UseCase;
import org.jala.edu.user.application.port.in.UpdateUserCommand;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.exception.UserNotFoundException;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;
import org.jala.edu.user.infrastructure.audit.AuditLog;
import org.jala.edu.user.infrastructure.delivery.CourierAssignmentReleaser;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;

/**
 * Igual que en user-module, más tres requisitos nuevos al desactivar un usuario:
 *   1. avisarle por correo,
 *   2. dejar registro de auditoría,
 *   3. si es COURIER, liberar sus entregas asignadas (le interesa al módulo de entregas).
 *
 * OLOR DE DISEÑO 3 (Observer): el caso de uso depende de TRES clases concretas de infraestructura y sabe
 * qué hace cada una. Cada nuevo interesado (pagos, pedidos, estadísticas...) obliga a modificar esta clase
 * y su constructor: viola Open/Closed y la regla de la arquitectura hexagonal (la aplicación no conoce adaptadores).
 */
public class UpdateUserUseCase implements UseCase<UpdateUserCommand, Void> {
    private final UserRepositoryPort userRepository;
    private final EmailNotifier emailNotifier;
    private final AuditLog auditLog;
    private final CourierAssignmentReleaser courierAssignmentReleaser;

    public UpdateUserUseCase(UserRepositoryPort userRepository, EmailNotifier emailNotifier, AuditLog auditLog,
                             CourierAssignmentReleaser courierAssignmentReleaser) {
        this.userRepository = userRepository;
        this.emailNotifier = emailNotifier;
        this.auditLog = auditLog;
        this.courierAssignmentReleaser = courierAssignmentReleaser;
    }

    @Override
    public Void execute(UpdateUserCommand command) {
        UserId id = new UserId(command.id());
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        boolean wasActive = user.isActive();

        user.updateProfile(command.firstName(), command.lastName(), command.phoneNumber());
        if (command.role() != user.getRole()) {
            user.changeRole(command.role());
        }
        if (command.status() != user.getStatus()) {
            if (command.status() == UserStatus.ACTIVE) {
                user.activate();
            } else {
                user.deactivate();
            }
        }
        userRepository.save(user);

        if (wasActive && !user.isActive()) {
            emailNotifier.sendDeactivated(user.getEmail(), user.fullName());
            auditLog.record("USER_DEACTIVATED " + user.getId());
            if (user.getRole() == UserRole.COURIER) {
                courierAssignmentReleaser.releaseAssignmentsOf(user.getId().value());
            }
        }
        return null;
    }
}
