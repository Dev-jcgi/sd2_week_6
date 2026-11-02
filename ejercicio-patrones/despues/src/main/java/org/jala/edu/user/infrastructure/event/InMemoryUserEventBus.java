package org.jala.edu.user.infrastructure.event;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.jala.edu.user.application.port.out.UserEventListener;
import org.jala.edu.user.application.port.out.UserEventPublisher;
import org.jala.edu.user.domain.event.UserEvent;

/**
 * OBSERVER · el Subject concreto: guarda la lista de suscriptores y les avisa a todos.
 * En el capstone esto lo haría Spring con ApplicationEventPublisher y @EventListener; aquí se ve sin magia.
 */
public class InMemoryUserEventBus implements UserEventPublisher {
    private final List<UserEventListener> listeners = new CopyOnWriteArrayList<>();

    public void subscribe(UserEventListener listener) {
        listeners.add(listener);
    }

    public void unsubscribe(UserEventListener listener) {
        listeners.remove(listener);
    }

    @Override
    public void publish(UserEvent event) {
        listeners.forEach(listener -> listener.on(event));
    }
}
