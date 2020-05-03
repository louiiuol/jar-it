package dev.louiiuol.etin.api.errors;

import java.io.Serializable;
import java.text.MessageFormat;

/** 
 * Represents an error when an object is not readable.
 * Provides cause as {@code String} to understand why this error occured
 */
public class MessageNotReadableError implements Serializable {

    private static final long serialVersionUID = -6144595402971494591L;

    private String cause;

    private String error = "{E_MESSAGE_NOT_READABLE}";

    /**
     * Creates a new {@code MessageNotReadableError} with given cause.
     * 
     * @param cause reason why message is not readable
     * @return new instance of {@code MessageNotReadableError}
     */
    public MessageNotReadableError(String cause) {
        this.cause = cause;
    }

    public String toString() {
        return MessageFormat.format("{ cause: {0}, error: {1} }", cause, error);
    }

}