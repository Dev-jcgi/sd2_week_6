package org.jala.edu.user;

import java.util.ArrayList;
import java.util.List;
import org.jala.edu.user.application.port.out.UserEventPublisher;
import org.jala.edu.user.domain.event.UserEvent;

/** Doble de prueba: guarda lo que se publica para revisarlo. */
public class RecordingPublisher implements UserEventPublisher {
    public final List<UserEvent> published = new ArrayList<>();

    @Override
    public void publish(UserEvent event) {
        published.add(event);
    }
}
