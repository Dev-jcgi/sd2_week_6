package org.jala.edu.user.application.usecase;

import org.jala.edu.core.application.usecase.UseCase;
import org.jala.edu.user.application.port.in.UpdateUserCommand;
import org.jala.edu.user.application.port.out.UserEventPublisher;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.exception.UserNotFoundException;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserStatus;

/**
 * DESPUÉS: depende solo de DOS puertos. No sabe que existen correos, auditoría ni entregas.
 * Agregar un nuevo interesado (pagos, estadísticas...) ya no toca esta clase: se registra otro listener.
 */
public class UpdateUserUseCase implements UseCase<UpdateUserCommand, Void> {
    private final UserRepositoryPort userRepository;
    private final UserEventPublisher eventPublisher;

    public UpdateUserUseCase(UserRepositoryPort userRepository, UserEventPublisher eventPublisher) {
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public Void execute(UpdateUserCommand command) {
        UserId id = new UserId(command.id());
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));

        user.updateProfile(command.firstName(), command.lastName(), command.phoneNumber());
        user.changeRole(command.role());
        if (command.status() == UserStatus.ACTIVE) {
            user.activate();
        } else {
            user.deactivate();
        }
        userRepository.save(user);
        eventPublisher.publishAll(user.pullEvents());
        return null;
    }
}
