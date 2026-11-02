package org.jala.edu.user.application.port.out;

import org.jala.edu.user.domain.event.UserEvent;

/** El "Observer" del patrón: cualquiera que quiera reaccionar a lo que pasa con los usuarios. */
@FunctionalInterface
public interface UserEventListener {
    void on(UserEvent event);
}
