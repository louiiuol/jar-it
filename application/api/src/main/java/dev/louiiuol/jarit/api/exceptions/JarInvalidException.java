package dev.louiiuol.jarit.api.exceptions;

/**
 * Defines a {@code RuntineException} the can be triggered from services
 * when a specific {@code Tinee} had invalid State
 * 
 * @see RuntimeException
 */
public class JarInvalidException extends RuntimeException {

    private static final long serialVersionUID = -8832903629692927911L;

    /**
     * Defines {@code TineeInvalidException} with custom message
     * 
     * @param message reason why the tinee is inactive
     * @return new {@code TineeInvalidException}
     */
    public JarInvalidException(String message) { super(message); }

}
