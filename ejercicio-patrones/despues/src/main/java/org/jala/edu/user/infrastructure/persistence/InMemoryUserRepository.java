package org.jala.edu.user.infrastructure.persistence;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;

/** Adaptador de salida en memoria (como InMemoryUserRepositoryAdapter del capstone). */
public class InMemoryUserRepository implements UserRepositoryPort {
    private final Map<UserId, User> users = new LinkedHashMap<>();

    @Override public User save(User user) { users.put(user.getId(), user); return user; }
    @Override public Optional<User> findById(UserId id) { return Optional.ofNullable(users.get(id)); }
    @Override public List<User> findAll() { return new ArrayList<>(users.values()); }
    @Override public boolean existsById(UserId id) { return users.containsKey(id); }
    @Override public void deleteById(UserId id) { users.remove(id); }

    @Override
    public boolean existsByEmail(Email email) {
        return users.values().stream().anyMatch(u -> u.getEmail().equals(email));
    }
}
