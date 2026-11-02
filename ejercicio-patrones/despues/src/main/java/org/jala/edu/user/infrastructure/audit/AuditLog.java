package org.jala.edu.user.infrastructure.audit;

import java.util.ArrayList;
import java.util.List;

/** Simula un registro de auditoría. */
public class AuditLog {
    private final List<String> entries = new ArrayList<>();

    public void record(String entry) { entries.add(entry); }

    public List<String> entries() { return List.copyOf(entries); }
}
