package org.jala.edu.user.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.jala.edu.user.RecordingPublisher;
import org.jala.edu.user.application.port.in.UpdateUserCommand;
import org.jala.edu.user.domain.event.UserDeactivated;
import org.jala.edu.user.domain.event.UserRoleChanged;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

/** El caso de uso se prueba SIN correos, auditoría ni entregas: solo revisa qué eventos publicó. */
class UpdateUserUseCaseTest {
    private InMemoryUserRepository repository;
    private RecordingPublisher publisher;
    private UpdateUserUseCase useCase;

    @BeforeEach
    void setUp() {
        repository = new InMemoryUserRepository();
        publisher = new RecordingPublisher();
        useCase = new UpdateUserUseCase(repository, publisher);
    }

    @Test
    void deactivatingAUserPublishesUserDeactivated() {
        User courier = repository.save(User.builder().firstName("Carlos").lastName("Ruiz")
                .email("carlos@mail.com").role(UserRole.COURIER).build());

        useCase.execute(new UpdateUserCommand(courier.getId().value(), "Carlos", "Ruiz", null,
                UserRole.COURIER, UserStatus.INACTIVE));

        assertEquals(1, publisher.published.size());
        UserDeactivated event = assertInstanceOf(UserDeactivated.class, publisher.published.get(0));
        assertEquals(UserRole.COURIER, event.role());
    }

    @Test
    void changingTheRolePublishesUserRoleChanged() {
        User user = repository.save(User.builder().firstName("Ana").lastName("Perez").email("ana@mail.com").build());

        useCase.execute(new UpdateUserCommand(user.getId().value(), "Ana", "Perez", null,
                UserRole.MERCHANT, UserStatus.ACTIVE));

        UserRoleChanged event = assertInstanceOf(UserRoleChanged.class, publisher.published.get(0));
        assertEquals(UserRole.MERCHANT, event.to());
    }

    @Test
    void aProfileChangePublishesNothing() {
        User user = repository.save(User.builder().firstName("Ana").lastName("Perez").email("ana@mail.com").build());

        useCase.execute(new UpdateUserCommand(user.getId().value(), "Ana María", "Perez", "7111",
                UserRole.CUSTOMER, UserStatus.ACTIVE));

        assertTrue(publisher.published.isEmpty());
    }
}
