package org.jala.edu.user.application.usecase;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import java.util.List;
import org.jala.edu.user.application.port.in.UpdateUserCommand;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;
import org.jala.edu.user.infrastructure.audit.AuditLog;
import org.jala.edu.user.infrastructure.delivery.CourierAssignmentReleaser;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UpdateUserUseCaseTest {
    private InMemoryUserRepository repository;
    private EmailNotifier notifier;
    private AuditLog auditLog;
    private CourierAssignmentReleaser releaser;
    private UpdateUserUseCase useCase;

    @BeforeEach
    void setUp() {
        repository = new InMemoryUserRepository();
        notifier = new EmailNotifier();
        auditLog = new AuditLog();
        releaser = new CourierAssignmentReleaser();
        useCase = new UpdateUserUseCase(repository, notifier, auditLog, releaser);
    }

    @Test
    void deactivatingCourierNotifiesAuditsAndReleasesAssignments() {
        Instant now = Instant.now();
        User courier = repository.save(User.restore(UserId.newId(), "Carlos", "Ruiz", new Email("carlos@mail.com"),
                null, UserRole.COURIER, UserStatus.ACTIVE, now, now));

        useCase.execute(new UpdateUserCommand(courier.getId().value(), "Carlos", "Ruiz", null,
                UserRole.COURIER, UserStatus.INACTIVE));

        assertEquals(1, notifier.sent().size());
        assertEquals(List.of("USER_DEACTIVATED " + courier.getId()), auditLog.entries());
        assertEquals(List.of(courier.getId().value()), releaser.released());
    }

    @Test
    void profileChangeDoesNotNotifyAnyone() {
        Instant now = Instant.now();
        User customer = repository.save(User.restore(UserId.newId(), "Ana", "Perez", new Email("ana@mail.com"),
                null, UserRole.CUSTOMER, UserStatus.ACTIVE, now, now));

        useCase.execute(new UpdateUserCommand(customer.getId().value(), "Ana María", "Perez", "7111",
                UserRole.CUSTOMER, UserStatus.ACTIVE));

        assertTrue(notifier.sent().isEmpty());
        assertTrue(auditLog.entries().isEmpty());
        assertEquals("Ana María Perez", repository.findById(customer.getId()).orElseThrow().fullName());
    }
}
