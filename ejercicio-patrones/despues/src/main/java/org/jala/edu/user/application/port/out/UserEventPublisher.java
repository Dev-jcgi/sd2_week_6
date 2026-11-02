package org.jala.edu.user.application.port.out;

import java.util.List;
import org.jala.edu.user.domain.event.UserEvent;

/**
 * Puerto de salida para publicar eventos (el "Subject" del patrón Observer visto desde la aplicación).
 * La aplicación solo sabe que publica; no sabe quién escucha ni cuántos son.
 */
public interface UserEventPublisher {
    void publish(UserEvent event);

    default void publishAll(List<UserEvent> events) {
        events.forEach(this::publish);
    }
}
