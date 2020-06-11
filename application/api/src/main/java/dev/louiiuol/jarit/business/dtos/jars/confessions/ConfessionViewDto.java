package dev.louiiuol.jarit.business.dtos.jars.confessions;

import java.text.MessageFormat;
import java.time.LocalDateTime;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code ConfessionViewDto}
 * to display {@code Report} informations
 * 
 * @see EntityIdDto
 */
public class ConfessionViewDto extends EntityIdDto {

    private static final long serialVersionUID = 6890622760916411206L;

    private String swear;

    private LocalDateTime date;

    protected ConfessionViewDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, swear: {1}, date: {2} }",
            getId(), swear, date);
    }

}