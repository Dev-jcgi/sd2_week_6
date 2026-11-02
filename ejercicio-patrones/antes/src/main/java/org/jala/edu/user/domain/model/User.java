package org.jala.edu.user.domain.model;

import java.time.Instant;
import java.util.Objects;
import org.jala.edu.core.domain.exception.DomainException;
import org.jala.edu.core.domain.model.BaseModel;

/**
 * Agregado User, igual al de user-module.
 *
 * OLOR DE DISEÑO 1 (Builder): restore(...) recibe 9 parámetros, varios del mismo tipo (String, Instant).
 * Es fácil invertir firstName con lastName o createdAt con updatedAt sin que el compilador lo note,
 * y quien solo quiere un usuario de prueba debe pasar null en lo que no le importa.
 */
public class User extends BaseModel<UserId> {
    private String firstName;
    private String lastName;
    private final Email email;
    private String phoneNumber;
    private UserRole role;
    private UserStatus status;

    private User(UserId id, String firstName, String lastName, Email email, String phoneNumber,
                 UserRole role, UserStatus status, Instant createdAt, Instant updatedAt) {
        super(id, createdAt, updatedAt);
        this.firstName = requireText(firstName, "First name");
        this.lastName = requireText(lastName, "Last name");
        this.email = Objects.requireNonNull(email, "Email is required");
        this.phoneNumber = phoneNumber;
        this.role = Objects.requireNonNull(role, "Role is required");
        this.status = Objects.requireNonNull(status, "Status is required");
    }

    /** Usuario nuevo: empieza ACTIVE. */
    public static User register(String firstName, String lastName, Email email, String phoneNumber, UserRole role) {
        Instant now = now();
        return new User(UserId.newId(), firstName, lastName, email, phoneNumber, role, UserStatus.ACTIVE, now, now);
    }

    /** Reconstruye un usuario existente (persistencia, datos de prueba). 9 parámetros. */
    public static User restore(UserId id, String firstName, String lastName, Email email, String phoneNumber,
                               UserRole role, UserStatus status, Instant createdAt, Instant updatedAt) {
        return new User(id, firstName, lastName, email, phoneNumber, role, status, createdAt, updatedAt);
    }

    public void updateProfile(String firstName, String lastName, String phoneNumber) {
        String validFirstName = requireText(firstName, "First name");
        String validLastName = requireText(lastName, "Last name");
        this.firstName = validFirstName;
        this.lastName = validLastName;
        this.phoneNumber = phoneNumber;
        touch();
    }

    public void changeRole(UserRole role) {
        this.role = Objects.requireNonNull(role, "Role is required");
        touch();
    }

    public void activate() { this.status = UserStatus.ACTIVE; touch(); }

    public void deactivate() { this.status = UserStatus.INACTIVE; touch(); }

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
}
