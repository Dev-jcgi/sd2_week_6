package org.jala.edu.user.application.factory;

import java.util.UUID;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.exception.EmailAlreadyRegisteredException;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;

/**
 * FACTORY: un solo lugar sabe CÓMO se crea un usuario válido.
 *  - create(...): usuario nuevo desde un comando (convierte el correo y aplica "el correo no se repite").
 *  - sample(...): usuario de prueba con id fijo (SampleUsers), armado con el Builder.
 * Cualquier caso de uso que cree usuarios (alta manual, importación, registro en el login) usa esta fábrica
 * en lugar de copiar la lógica.
 */
public class UserFactory {
    private final UserRepositoryPort userRepository;

    public UserFactory(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    public User create(CreateUserCommand command) {
        Email email = new Email(command.email());
        if (userRepository.existsByEmail(email)) {
            throw new EmailAlreadyRegisteredException(email);
        }
        return User.register(command.firstName(), command.lastName(), email, command.phoneNumber(), command.role());
    }

    public User sample(UUID id, String lastName, String email, UserRole role, UserStatus status) {
        return User.builder()
                .id(new UserId(id))
                .firstName("Sample")
                .lastName(lastName)
                .email(email)
                .role(role)
                .status(status)
                .build();
    }
}
