package org.jala.edu.user.application.factory;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.UUID;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.domain.event.UserRegistered;
import org.jala.edu.user.domain.exception.EmailAlreadyRegisteredException;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;
import org.junit.jupiter.api.Test;

class UserFactoryTest {
    private final InMemoryUserRepository repository = new InMemoryUserRepository();
    private final UserFactory factory = new UserFactory(repository);

    @Test
    void createsANewUserThatAnnouncesItsRegistration() {
        User user = factory.create(new CreateUserCommand("Ana", "Perez", "Ana@Mail.com", null, UserRole.CUSTOMER));

        assertEquals("ana@mail.com", user.getEmail().value());
        assertInstanceOf(UserRegistered.class, user.pullEvents().get(0));
    }

    @Test
    void rejectsAnEmailThatIsAlreadyRegistered() {
        repository.save(factory.create(new CreateUserCommand("Ana", "Perez", "ana@mail.com", null, UserRole.CUSTOMER)));

        assertThrows(EmailAlreadyRegisteredException.class, () ->
                factory.create(new CreateUserCommand("Otra", "Ana", "ANA@mail.com", null, UserRole.CUSTOMER)));
    }

    @Test
    void buildsSampleUsersWithFixedIds() {
        UUID id = UUID.fromString("00000000-0000-0000-0000-000000000004");

        User courier = factory.sample(id, "Courier", "courier@sample.delivery", UserRole.COURIER, UserStatus.ACTIVE);

        assertEquals(id, courier.getId().value());
        assertEquals("Sample Courier", courier.fullName());
    }
}
