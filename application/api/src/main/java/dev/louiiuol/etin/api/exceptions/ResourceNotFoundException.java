package dev.louiiuol.etin.api.exceptions;

/**
 * Defines a {@code RuntineException} the can be triggered from services
 * when a specific ressource was not found and was required
 * 
 * @see RuntimeException
 */
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = -8832903629692927911L;

    public ResourceNotFoundException() {
        super();
    }

}
