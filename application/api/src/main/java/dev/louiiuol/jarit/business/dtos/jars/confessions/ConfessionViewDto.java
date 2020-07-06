package dev.louiiuol.jarit.business.dtos.jars.confessions;

import java.text.MessageFormat;
import java.time.LocalDateTime;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberPreviewDto;

/**
 * DTO representing the {@code ConfessionViewDto}
 * to display {@code Report} informations
 * 
 * @see EntityIdDto
 */
public class ConfessionViewDto {

    private long id;

    private String swear;

    private LocalDateTime date;

    private MemberPreviewDto author;

    protected ConfessionViewDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, swear: {1}, date: {2}, author: {3} }",
            id, swear, date, author);
    }

}