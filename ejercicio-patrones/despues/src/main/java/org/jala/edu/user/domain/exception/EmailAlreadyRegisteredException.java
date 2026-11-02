package org.jala.edu.user.domain.exception;

import org.jala.edu.core.domain.exception.DomainException;
import org.jala.edu.user.domain.model.Email;

public class EmailAlreadyRegisteredException extends DomainException {
    public EmailAlreadyRegisteredException(Email email) { super("Email already registered: " + email); }
}
