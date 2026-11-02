package org.jala.edu.user.infrastructure.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.UUID;
import org.jala.edu.user.application.port.in.CreateUserCommand;
import org.jala.edu.user.application.port.in.UpdateUserCommand;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;
import org.junit.jupiter.api.Test;

/** Prueba de punta a punta: el mismo comportamiento de la versión ANTES, ahora con eventos y listeners. */
class UserModuleTest {
    @Test
    void creatingAUserSendsWelcomeAndAudits() {
        UserModule module = new UserModule();

        UUID id = module.createUser.execute(new CreateUserCommand("Ana", "Perez", "ana@mail.com", null, UserRole.CUSTOMER));

        assertTrue(module.emailNotifier.sent().get(0).startsWith("WELCOME ana@mail.com"));
        assertEquals(List.of("USER_REGISTERED " + id), module.auditLog.entries());
    }

    @Test
    void deactivatingTheSampleCourierNotifiesAuditsAndReleasesAssignments() {
        UserModule module = new UserModule();
        module.sampleUsersLoader.load();
        UUID courier = SampleUsersLoader.COURIER;

        module.updateUser.execute(new UpdateUserCommand(courier, "Sample", "Courier", null,
                UserRole.COURIER, UserStatus.INACTIVE));

        assertEquals(1, module.emailNotifier.sent().size());
        assertEquals(List.of("USER_DEACTIVATED " + courier), module.auditLog.entries());
        assertEquals(List.of(courier), module.courierReleaser.released());
    }

    @Test
    void sampleUsersAreLoadedOnlyOnce() {
        UserModule module = new UserModule();

        module.sampleUsersLoader.load();
        module.sampleUsersLoader.load();

        assertEquals(5, module.repository.findAll().size());
        assertFalse(module.repository.findById(new UserId(SampleUsersLoader.INACTIVE_CUSTOMER)).orElseThrow().isActive());
    }
}
