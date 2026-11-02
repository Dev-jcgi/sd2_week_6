package org.jala.edu.user.domain.model;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.jala.edu.core.domain.exception.DomainException;
import org.jala.edu.core.domain.model.BaseModel;
import org.jala.edu.user.domain.event.UserDeactivated;
import org.jala.edu.user.domain.event.UserEvent;
import org.jala.edu.user.domain.event.UserRegistered;
import org.jala.edu.user.domain.event.UserRoleChanged;

/**
 * Agregado User DESPUÉS de aplicar los patrones.
 *
 * BUILDER: reemplaza restore(...) de 9 parámetros. Cada dato se nombra (firstName("Ana")) y el builder pone
 * valores por defecto razonables (id nuevo, ACTIVE, fechas = ahora). build() valida igual que antes.
 *
 * OBSERVER (lado del dominio): el agregado no avisa a nadie; solo ANOTA lo que pasó como eventos de dominio
 * (UserRegistered, UserDeactivated, UserRoleChanged). La aplicación los publica después de guardar.
 */
public class User extends BaseModel<UserId> {
    private String firstName;
    private String lastName;
    private final Email email;
    private String phoneNumber;
    private UserRole role;
    private UserStatus status;
    private final List<UserEvent> events = new ArrayList<>();

    private User(Builder b) {
        super(b.id, b.createdAt, b.updatedAt);
        this.firstName = requireText(b.firstName, "First name");
        this.lastName = requireText(b.lastName, "Last name");
        this.email = Objects.requireNonNull(b.email, "Email is required");
        this.phoneNumber = b.phoneNumber;
        this.role = Objects.requireNonNull(b.role, "Role is required");
        this.status = Objects.requireNonNull(b.status, "Status is required");
    }

    /** Usuario nuevo: empieza ACTIVE y anota el evento UserRegistered. */
    public static User register(String firstName, String lastName, Email email, String phoneNumber, UserRole role) {
        User user = builder().firstName(firstName).lastName(lastName).email(email)
                .phoneNumber(phoneNumber).role(role).build();
        user.events.add(new UserRegistered(user.getId(), email, user.fullName(), user.getCreatedAt()));
        return user;
    }

    /** Punto de entrada del Builder (persistencia, datos de prueba, pruebas unitarias). */
    public static Builder builder() {
        return new Builder();
    }

    public void updateProfile(String firstName, String lastName, String phoneNumber) {
        String validFirstName = requireText(firstName, "First name");
        String validLastName = requireText(lastName, "Last name");
        this.firstName = validFirstName;
        this.lastName = validLastName;
        this.phoneNumber = phoneNumber;
        touch();
    }

    public void changeRole(UserRole newRole) {
        Objects.requireNonNull(newRole, "Role is required");
        if (newRole == role) {
            return;
        }
        UserRole previous = role;
        this.role = newRole;
        touch();
        events.add(new UserRoleChanged(getId(), previous, newRole, getUpdatedAt()));
    }

    public void activate() {
        this.status = UserStatus.ACTIVE;
        touch();
    }

    public void deactivate() {
        if (!isActive()) {
            return;
        }
        this.status = UserStatus.INACTIVE;
        touch();
        events.add(new UserDeactivated(getId(), email, fullName(), role, getUpdatedAt()));
    }

    /** Entrega los eventos anotados y los borra, para no publicarlos dos veces. */
    public List<UserEvent> pullEvents() {
        List<UserEvent> pending = List.copyOf(events);
        events.clear();
        return pending;
    }

    public boolean isActive() { return status == UserStatus.ACTIVE; }

    public String fullName() { return firstName + " " + lastName; }

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Email getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public UserRole getRole() { return role; }
    public UserStatus getStatus() { return status; }

    private static String requireText(String value, String field) {
        if (value == null || value.isBlank()) {
            throw new DomainException(field + " cannot be blank");
        }
        return value.strip();
    }

    /**
     * Builder de User. Valores por defecto: id nuevo, rol CUSTOMER, estado ACTIVE, fechas = ahora.
     * Lo obligatorio (nombre, apellido, correo) se valida en build().
     */
    public static final class Builder {
        private UserId id = UserId.newId();
        private String firstName;
        private String lastName;
        private Email email;
        private String phoneNumber;
        private UserRole role = UserRole.CUSTOMER;
        private UserStatus status = UserStatus.ACTIVE;
        private Instant createdAt;
        private Instant updatedAt;

        private Builder() {
        }

        public Builder id(UserId id) { this.id = id; return this; }
        public Builder firstName(String firstName) { this.firstName = firstName; return this; }
        public Builder lastName(String lastName) { this.lastName = lastName; return this; }
        public Builder email(Email email) { this.email = email; return this; }
        public Builder email(String email) { this.email = new Email(email); return this; }
        public Builder phoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; return this; }
        public Builder role(UserRole role) { this.role = role; return this; }
        public Builder status(UserStatus status) { this.status = status; return this; }
        public Builder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(Instant updatedAt) { this.updatedAt = updatedAt; return this; }

        public User build() {
            Instant now = Instant.now().truncatedTo(ChronoUnit.MICROS);
            if (createdAt == null) {
                createdAt = now;
            }
            if (updatedAt == null) {
                updatedAt = createdAt;
            }
            return new User(this);
        }
    }
}
