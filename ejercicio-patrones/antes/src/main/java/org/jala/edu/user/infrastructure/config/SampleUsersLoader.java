package org.jala.edu.user.infrastructure.config;

import java.time.Instant;
import java.util.UUID;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.model.Email;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserId;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;

/**
 * Carga los 5 usuarios de prueba con ids fijos (SampleUsers del core-module).
 *
 * OLOR DE DISEÑO 1 (Builder) y 2 (Factory): cada usuario se arma con restore(...) de 9 parámetros,
 * pasando null en el teléfono y repitiendo "Sample" y las fechas.
 */
public class SampleUsersLoader {
    public static final UUID ADMIN = UUID.fromString("00000000-0000-0000-0000-000000000001");
    public static final UUID MERCHANT = UUID.fromString("00000000-0000-0000-0000-000000000002");
    public static final UUID CUSTOMER = UUID.fromString("00000000-0000-0000-0000-000000000003");
    public static final UUID COURIER = UUID.fromString("00000000-0000-0000-0000-000000000004");
    public static final UUID INACTIVE_CUSTOMER = UUID.fromString("00000000-0000-0000-0000-000000000005");

    private final UserRepositoryPort userRepository;

    public SampleUsersLoader(UserRepositoryPort userRepository) {
        this.userRepository = userRepository;
    }

    public void load() {
        Instant now = Instant.now();
        store(User.restore(new UserId(ADMIN), "Sample", "Admin", new Email("admin@sample.delivery"), null,
                UserRole.ADMIN, UserStatus.ACTIVE, now, now));
        store(User.restore(new UserId(MERCHANT), "Sample", "Merchant", new Email("merchant@sample.delivery"), null,
                UserRole.MERCHANT, UserStatus.ACTIVE, now, now));
        store(User.restore(new UserId(CUSTOMER), "Sample", "Customer", new Email("customer@sample.delivery"), null,
                UserRole.CUSTOMER, UserStatus.ACTIVE, now, now));
        store(User.restore(new UserId(COURIER), "Sample", "Courier", new Email("courier@sample.delivery"), null,
                UserRole.COURIER, UserStatus.ACTIVE, now, now));
        store(User.restore(new UserId(INACTIVE_CUSTOMER), "Sample", "Inactive", new Email("inactive@sample.delivery"),
                null, UserRole.CUSTOMER, UserStatus.INACTIVE, now, now));
    }

    private void store(User user) {
        if (userRepository.existsById(user.getId()) || userRepository.existsByEmail(user.getEmail())) {
            return;
        }
        userRepository.save(user);
    }
}
