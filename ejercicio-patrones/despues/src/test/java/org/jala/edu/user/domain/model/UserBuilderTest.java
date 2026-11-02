package org.jala.edu.user.domain.model;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import org.jala.edu.core.domain.exception.DomainException;
import org.junit.jupiter.api.Test;

class UserBuilderTest {
    @Test
    void buildsWithNamedValuesAndSensibleDefaults() {
        User user = User.builder().firstName("Ana").lastName("Perez").email("ana@mail.com").build();

        assertEquals("Ana Perez", user.fullName());
        assertEquals(UserRole.CUSTOMER, user.getRole());
        assertTrue(user.isActive());
        assertEquals(user.getCreatedAt(), user.getUpdatedAt());
    }

    @Test
    void restoresAnExistingUserWithAllItsData() {
        Instant created = Instant.parse("2026-10-19T10:00:00Z");
        UserId id = UserId.newId();

        User user = User.builder().id(id).firstName("Carlos").lastName("Ruiz").email("carlos@mail.com")
                .role(UserRole.COURIER).status(UserStatus.INACTIVE)
                .createdAt(created).updatedAt(created.plusSeconds(60)).build();

        assertEquals(id, user.getId());
        assertEquals(UserStatus.INACTIVE, user.getStatus());
        assertEquals(created, user.getCreatedAt());
        assertTrue(user.pullEvents().isEmpty(), "restaurar no es registrar: no debe haber eventos");
    }

    @Test
    void keepsTheDomainValidation() {
        assertThrows(DomainException.class, () -> User.builder().firstName(" ").lastName("Perez").email("a@b.co").build());
        assertThrows(NullPointerException.class, () -> User.builder().firstName("Ana").lastName("Perez").build());
    }
}
