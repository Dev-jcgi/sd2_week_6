package org.jala.edu.user.infrastructure.event;

import org.jala.edu.user.application.port.out.UserEventListener;
import org.jala.edu.user.domain.event.UserDeactivated;
import org.jala.edu.user.domain.event.UserEvent;
import org.jala.edu.user.domain.event.UserRegistered;
import org.jala.edu.user.infrastructure.notification.EmailNotifier;

/** Observer: correos de bienvenida y de desactivación. */
public class WelcomeEmailListener implements UserEventListener {
    private final EmailNotifier emailNotifier;

    public WelcomeEmailListener(EmailNotifier emailNotifier) {
        this.emailNotifier = emailNotifier;
    }

    @Override
    public void on(UserEvent event) {
        switch (event) {
            case UserRegistered e -> emailNotifier.sendWelcome(e.email(), e.fullName());
            case UserDeactivated e -> emailNotifier.sendDeactivated(e.email(), e.fullName());
            default -> { }
        }
    }
}
