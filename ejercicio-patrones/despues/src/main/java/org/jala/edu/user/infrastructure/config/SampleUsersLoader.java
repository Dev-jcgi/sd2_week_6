package org.jala.edu.user.infrastructure.config;

import java.util.UUID;
import org.jala.edu.user.application.factory.UserFactory;
import org.jala.edu.user.application.port.out.UserRepositoryPort;
import org.jala.edu.user.domain.model.User;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.domain.model.UserStatus;

/** DESPUÉS: cada usuario de prueba es UNA línea legible gracias a la Factory (que usa el Builder). */
public class SampleUsersLoader {
    public static final UUID ADMIN = UUID.fromString("00000000-0000-0000-0000-000000000001");
    public static final UUID MERCHANT = UUID.fromString("00000000-0000-0000-0000-000000000002");
    public static final UUID CUSTOMER = UUID.fromString("00000000-0000-0000-0000-000000000003");
    public static final UUID COURIER = UUID.fromString("00000000-0000-0000-0000-000000000004");
    public static final UUID INACTIVE_CUSTOMER = UUID.fromString("00000000-0000-0000-0000-000000000005");

    private final UserRepositoryPort userRepository;
    private final UserFactory userFactory;

    public SampleUsersLoader(UserRepositoryPort userRepository, UserFactory userFactory) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    public void load() {
        store(userFactory.sample(ADMIN, "Admin", "admin@sample.delivery", UserRole.ADMIN, UserStatus.ACTIVE));
        store(userFactory.sample(MERCHANT, "Merchant", "merchant@sample.delivery", UserRole.MERCHANT, UserStatus.ACTIVE));
        store(userFactory.sample(CUSTOMER, "Customer", "customer@sample.delivery", UserRole.CUSTOMER, UserStatus.ACTIVE));
        store(userFactory.sample(COURIER, "Courier", "courier@sample.delivery", UserRole.COURIER, UserStatus.ACTIVE));
        store(userFactory.sample(INACTIVE_CUSTOMER, "Inactive", "inactive@sample.delivery", UserRole.CUSTOMER,
                UserStatus.INACTIVE));
    }

    private void store(User user) {
        if (userRepository.existsById(user.getId()) || userRepository.existsByEmail(user.getEmail())) {
            return;
        }
        userRepository.save(user);
    }
}
