package org.jala.edu.user.infrastructure.config;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;
import org.junit.jupiter.api.Test;

class SampleUsersLoaderTest {
    @Test
    void loadsFiveSampleUsersOnlyOnce() {
        InMemoryUserRepository repository = new InMemoryUserRepository();
        SampleUsersLoader loader = new SampleUsersLoader(repository);

        loader.load();
        loader.load();

        assertEquals(5, repository.findAll().size());
        assertFalse(repository.findById(new UserId(SampleUsersLoader.INACTIVE_CUSTOMER)).orElseThrow().isActive());
    }
}
