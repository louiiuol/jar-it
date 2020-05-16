package dev.louiiuol.jarit.api.errors;

import java.io.Serializable;
import java.text.MessageFormat;

/**
 * Represents an error when specific resource cannot be found.
 */
public class ResourceNotFoundError implements Serializable {

    private static final long serialVersionUID = 1L;

    private String error = "{E_NOT_FOUND}";

    public ResourceNotFoundError() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ error: {0} }", error);
    }

}