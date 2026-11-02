package org.jala.edu.core.application.port.out;

import java.util.List;
import java.util.Optional;
import org.jala.edu.core.domain.model.BaseModel;

public interface CrudRepositoryPort<T extends BaseModel<ID>, ID> {
    T save(T model);
    Optional<T> findById(ID id);
    List<T> findAll();
    boolean existsById(ID id);
    void deleteById(ID id);
}
