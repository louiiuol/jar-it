package dev.louiiuol.jarit.api.errors;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.*;
import java.text.MessageFormat;

/**
 * Defines a final class holding various errors types catched by API:
 * Theses will we wrap in a field 'errors', and additional informations
 * regarding errors' sources will be provided.
 */
public final class ApiErrorsDto<T> implements Serializable {

    private static final long serialVersionUID = 7277092767926099434L;

    private final transient List<T> errors;

    private final int errorCount;

    private final LocalDateTime timestamp = LocalDateTime.now();

    private final int status;

    private final String path;

    /**
     * Defines a new {@code ApiErrorsDto} with given arguments.
     * 
     * @param errors list of catched errors 
     * @param status http status returned by server
     * @param path path causing the exception
     * @return new instance of {@code ApiErrorsDto}
     */
    public ApiErrorsDto(List<T> errors, int status, String path) {
        this.errors = Collections.unmodifiableList(errors);
        errorCount = errors.size();
        this.status = status;
        this.path = path;
    }

    public List<T> getErrors() {
        return errors;
    }

    public int getErrorCount() {
        return errorCount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getPath() {
        return path;
    }

    @Override
    public String toString() {
        return MessageFormat
            .format( "{ errors: {0}, errorCount: {1}, timestamp: {2}, status: {3}, path: {4} }",
                errors, errorCount, timestamp, status, path);
    }

}