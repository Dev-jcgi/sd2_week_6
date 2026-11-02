package org.jala.edu.user.infrastructure.event;

import org.jala.edu.user.application.port.out.UserEventListener;
import org.jala.edu.user.domain.event.UserDeactivated;
import org.jala.edu.user.domain.event.UserEvent;
import org.jala.edu.user.domain.model.UserRole;
import org.jala.edu.user.infrastructure.delivery.CourierAssignmentReleaser;

/**
 * Observer: cuando se desactiva un COURIER, libera sus entregas.
 * En el capstone este listener viviría en delivery-module, escuchando un evento publicado en core-module.
 */
public class CourierReleaseListener implements UserEventListener {
    private final CourierAssignmentReleaser releaser;

    public CourierReleaseListener(CourierAssignmentReleaser releaser) {
        this.releaser = releaser;
    }

    @Override
    public void on(UserEvent event) {
        if (event instanceof UserDeactivated e && e.role() == UserRole.COURIER) {
            releaser.releaseAssignmentsOf(e.userId().value());
        }
    }
}
