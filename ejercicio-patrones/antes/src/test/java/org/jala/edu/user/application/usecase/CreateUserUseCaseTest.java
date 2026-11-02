package org.jala.edu.user.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.UUID;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.domain.exception.EmailAlreadyRegisteredException;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CreateUserUseCaseTest {
    private InMemoryUserRepository repository;
    private EmailNotifier notifier;
    private CreateUserUseCase useCase;

    @BeforeEach
    void setUp() {
        repository = new InMemoryUserRepository();
        notifier = new EmailNotifier();
        useCase = new CreateUserUseCase(repository, notifier);
    }

    @Test
    void createsActiveUserAndSendsWelcome() {
        UUID id = useCase.execute(new CreateUserCommand("Ana", "Perez", "ana@mail.com", "70000000", UserRole.CUSTOMER));

        assertTrue(repository.findById(new UserId(id)).orElseThrow().isActive());
        assertEquals(1, notifier.sent().size());
        assertTrue(notifier.sent().get(0).startsWith("WELCOME ana@mail.com"));
    }

    @Test
    void rejectsDuplicatedEmail() {
        useCase.execute(new CreateUserCommand("Ana", "Perez", "ana@mail.com", null, UserRole.CUSTOMER));

        assertThrows(EmailAlreadyRegisteredException.class, () ->
                useCase.execute(new CreateUserCommand("Otra", "Ana", "ANA@mail.com", null, UserRole.CUSTOMER)));
    }
}
