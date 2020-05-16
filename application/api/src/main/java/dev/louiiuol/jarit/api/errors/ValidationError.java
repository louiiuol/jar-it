package dev.louiiuol.jarit.api.errors;

import java.io.Serializable;
import java.text.MessageFormat;

/**
 * Defines a validation holding errors when invalid input dto are sent to API.
 * This class holds additional informations, such as entity name, field name,
 * catched error and type (ERROR - GLOBAL)
 */
public final class ValidationError implements Serializable {

    private static final long serialVersionUID = -3177218154124197588L;

    private ValidationError(String entityName, String fieldName, String error) {
        this.entityName = entityName;
        this.fieldName = fieldName;
        this.error = error;
    }

    private String entityName;

    private String fieldName;

    private String error;

    private Type type = Type.FIELD;

    public String getEntityName() {
        return entityName;
    }

    public String getFieldName() {
        return fieldName;
    }

    public String getError() {
        return error;
    }

    public Type getType() {
        return type;
    }

    /**
     * Defines validation error as a GLOBAL type
     * 
     * @param entityName invalid entity
     * @param fieldName invalid field
     * @param errorMessage reason / cause message
     * @return updated {@code ValidationError}
     */
    public static ValidationError ofGlobalType(String entityName, String fieldName, String errorMessage) {
        ValidationError error = new ValidationError(entityName, fieldName, errorMessage);
        error.type = Type.GLOBAL;
        return error;
    }

    /**
     * Defines validation error as a FIELD type (default)
     * 
     * @param entityName invalid entity
     * @param fieldName invalid field
     * @param errorMessage reason / cause message
     * @return new instance of {@code ValidationError}
     */
    public static ValidationError ofFieldType(String entityName, String fieldName, String errorMessage) { 
        return new ValidationError(entityName, fieldName, errorMessage); 
    }

    @Override
    public String toString() {
        return MessageFormat
            .format("{ entityName: {0}, fieldName: {1}, error: {2}, type: {3} }",
                entityName, fieldName, error, type);
    }

    /**
     * Defines {@code ValidatorError} type:
     * <p>
     * FIELD (from a specific property) or GLOBAL (from dto)
     */
    public enum Type { FIELD, GLOBAL }

}