package org.jala.edu.user.infrastructure.delivery;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/** Simula al módulo de entregas: libera los pedidos asignados a un repartidor. */
public class CourierAssignmentReleaser {
    private final List<UUID> released = new ArrayList<>();

    public void releaseAssignmentsOf(UUID courierId) { released.add(courierId); }

    public List<UUID> released() { return List.copyOf(released); }
}
