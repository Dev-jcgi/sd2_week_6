package org.jala.edu.user.application.usecase;

import java.util.UUID;
import org.jala.edu.core.application.usecase.UseCase;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.exception.EmailAlreadyRegisteredException;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;

/**
 * Igual que en user-module, más el nuevo requisito: enviar un correo de bienvenida.
 *
 * OLOR DE DISEÑO 2 (Factory): la regla "el correo no puede repetirse" y la conversión de texto a Email viven
 * dentro del caso de uso (newModel). Si otro caso de uso (importar usuarios, registro desde login) necesita
 * crear usuarios, copiará esta lógica.
 *
 * OLOR DE DISEÑO 3 (Observer): el caso de uso conoce y llama directamente a EmailNotifier (infraestructura).
 */
public class CreateUserUseCase implements UseCase<CreateUserCommand, UUID> {
    private final UserRepositoryPort userRepository;
    private final EmailNotifier emailNotifier;

    public CreateUserUseCase(UserRepositoryPort userRepository, EmailNotifier emailNotifier) {
        this.userRepository = userRepository;
        this.emailNotifier = emailNotifier;
    }

    @Override
    public UUID execute(CreateUserCommand command) {
        User newUser = userRepository.save(newModel(command));
        emailNotifier.sendWelcome(newUser.getEmail(), newUser.fullName());
        return newUser.getId().value();
    }

    public User newModel(CreateUserCommand command) {
        Email email = new Email(command.email());
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyRegisteredException(email);
        }
        return User.register(command.firstName(), command.lastName(), email, command.phoneNumber(), command.role());
    }
}
