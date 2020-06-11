package dev.louiiuol.jarit.business.dtos.jars.confessions;

import java.text.MessageFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import dev.louiiuol.jarit.api.validators.jar.confess.OwnConfess;
import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code ConfessionCreateDto} to create new {@code Report}
 * 
 * @see OwnConfess
 */
@OwnConfess
public class ConfessDto {

    @NotBlank
    private String swear;

    @NotNull
    private EntityIdDto author;

    @NotNull
    private EntityIdDto jar;

    protected ConfessDto() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Retrieve the {@code Jar}'s' id of existing {@code ConfessionCreateDto}
     * 
     * @return {@code Long}
     */
    public EntityIdDto getJar() {
        return jar;
    }

    /**
     * Retrieve the {@code User}'s' id, which is the author
     * of existing {@code ConfessionCreateDto}
     * 
     * @return {@code EntityIdDto}
     */
    public EntityIdDto getAuthor() {
        return author;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ swear: {0}, author: {1}, jar: {2} }",
            swear, author.getId(), jar.getId());
    }

}