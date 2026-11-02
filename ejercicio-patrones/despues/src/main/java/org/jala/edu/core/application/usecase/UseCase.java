package org.jala.edu.core.application.usecase;

@FunctionalInterface
public interface UseCase<Input, Output> {
    Output execute(Input input);
}
