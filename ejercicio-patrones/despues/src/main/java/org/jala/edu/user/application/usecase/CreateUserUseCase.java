package org.jala.edu.user.application.usecase;

import java.util.UUID;
import org.jala.edu.core.application.usecase.UseCase;
import org.jala.edu.user.application.factory.UserFactory;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.application.port.out.UserEventPublisher;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.model.User;

/**
 * DESPUÉS: la creación la decide la FACTORY y el correo de bienvenida ya no está aquí.
 * El caso de uso guarda y publica los eventos; un listener se encarga del correo.
 */
public class CreateUserUseCase implements UseCase<CreateUserCommand, UUID> {
    private final UserRepositoryPort userRepository;
    private final UserFactory userFactory;
    private final UserEventPublisher eventPublisher;

    public CreateUserUseCase(UserRepositoryPort userRepository, UserFactory userFactory,
                             UserEventPublisher eventPublisher) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
        this.eventPublisher = eventPublisher;
    }

    @Override
    public UUID execute(CreateUserCommand command) {
        User newUser = userRepository.save(userFactory.create(command));
        eventPublisher.publishAll(newUser.pullEvents());
        return newUser.getId().value();
    }
}
