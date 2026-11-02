package org.jala.edu.user.infrastructure.event;

import org.jala.edu.user.application.port.out.UserEventListener;
import org.jala.edu.user.domain.event.UserDeactivated;
import org.jala.edu.user.domain.event.UserEvent;
import org.jala.edu.user.domain.event.UserRegistered;
import org.jala.edu.user.domain.event.UserRoleChanged;
import org.jala.edu.user.infrastructure.audit.AuditLog;

/** Observer: deja registro de auditoría de todos los eventos (switch exhaustivo gracias a sealed). */
public class AuditLogListener implements UserEventListener {
    private final AuditLog auditLog;

    public AuditLogListener(AuditLog auditLog) {
        this.auditLog = auditLog;
    }

    @Override
    public void on(UserEvent event) {
        String type = switch (event) {
            case UserRegistered e -> "USER_REGISTERED";
            case UserDeactivated e -> "USER_DEACTIVATED";
            case UserRoleChanged e -> "USER_ROLE_CHANGED";
        };
        auditLog.record(type + " " + event.userId());
    }
}
