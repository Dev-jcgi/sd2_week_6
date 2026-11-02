package org.jala.edu.core.domain.model;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Objects;

/** Igual que en core-module: identidad, fechas e igualdad por id (aquí sin Lombok). */
public abstract class BaseModel<ID> {
    private final ID id;
    private final Instant createdAt;
    private Instant updatedAt;

    protected BaseModel(ID id, Instant createdAt, Instant updatedAt) {
        this.id = Objects.requireNonNull(id, "Id is required");
        this.createdAt = Objects.requireNonNull(createdAt, "Creation date is required");
        this.updatedAt = Objects.requireNonNull(updatedAt, "Update date is required");
    }

    public ID getId() { return id; }
    public Instant getCreatedAt() { return createdAt; }
    public Instant getUpdatedAt() { return updatedAt; }

    protected void touch() { this.updatedAt = now(); }

    protected static Instant now() { return Instant.now().truncatedTo(ChronoUnit.MICROS); }

    @Override
    public boolean equals(Object o) {
        return o instanceof BaseModel<?> other && getClass() == other.getClass() && id.equals(other.id);
    }

    @Override
    public int hashCode() { return id.hashCode(); }
}
