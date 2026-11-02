package org.jala.edu.user.infrastructure.notification;

import java.util.ArrayList;
import java.util.List;
import org.jala.edu.user.domain.model.Email;

/** Simula el envío de correos: guarda los mensajes en una lista para poder verlos en las pruebas. */
public class EmailNotifier {
    private final List<String> sent = new ArrayList<>();

    public void sendWelcome(Email to, String name) { sent.add("WELCOME " + to + " " + name); }

    public void sendDeactivated(Email to, String name) { sent.add("DEACTIVATED " + to + " " + name); }

    public List<String> sent() { return List.copyOf(sent); }
}
