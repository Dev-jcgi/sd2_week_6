package org.jala.edu.user.infrastructure.config;

import org.jala.edu.user.application.factory.UserFactory;
import org.jala.edu.user.application.usecase.CreateUserUseCase;
import org.jala.edu.user.application.usecase.UpdateUserUseCase;
import org.jala.edu.user.infrastructure.audit.AuditLog;
import org.jala.edu.user.infrastructure.delivery.CourierAssignmentReleaser;
import org.jala.edu.user.infrastructure.event.AuditLogListener;
import org.jala.edu.user.infrastructure.event.CourierReleaseListener;
import org.jala.edu.user.infrastructure.event.InMemoryUserEventBus;
import org.jala.edu.user.infrastructure.event.WelcomeEmailListener;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;
import org.jala.edu.user.infrastructure.persistence.InMemoryUserRepository;

/**
 * Raíz de composición en Java puro (en el capstone es UserModuleConfiguration con @Bean).
 * Es el ÚNICO lugar que conoce las clases concretas y decide quién escucha a quién.
 * Agregar un interesado nuevo = una línea subscribe(...) aquí, sin tocar los casos de uso.
 */
public final class UserModule {
    public final InMemoryUserRepository repository = new InMemoryUserRepository();
    public final InMemoryUserEventBus eventBus = new InMemoryUserEventBus();
    public final EmailNotifier emailNotifier = new EmailNotifier();
    public final AuditLog auditLog = new AuditLog();
    public final CourierAssignmentReleaser courierReleaser = new CourierAssignmentReleaser();
    public final UserFactory userFactory = new UserFactory(repository);
    public final CreateUserUseCase createUser = new CreateUserUseCase(repository, userFactory, eventBus);
    public final UpdateUserUseCase updateUser = new UpdateUserUseCase(repository, eventBus);
    public final SampleUsersLoader sampleUsersLoader = new SampleUsersLoader(repository, userFactory);

    public UserModule() {
        eventBus.subscribe(new WelcomeEmailListener(emailNotifier));
        eventBus.subscribe(new AuditLogListener(auditLog));
        eventBus.subscribe(new CourierReleaseListener(courierReleaser));
    }
}
