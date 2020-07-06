package dev.louiiuol.jarit.business.dtos.jars;

import java.text.MessageFormat;
import java.time.LocalDate;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationViewDto;
import dev.louiiuol.jarit.business.dtos.users.UserViewDto;
import dev.louiiuol.jarit.business.entities.JarState;

/**
 * DTO representing the {@code JarPreviewDto} to display {@code Jar} Preview
 * informations
 * 
 * @see EntityIdDto
 */
public class JarPreviewDto {

    private Long id;

    private String title;

    private UserViewDto author;

    private AssociationViewDto addressee;

    private LocalDate startingDate;

    private LocalDate closingDate;

    private JarState state;

    private Double maxAmount;

    private JarPreviewExtrasDto additionalInfos;

    protected JarPreviewDto() {
        // Overrides default no-args constructor as protected
    }

    public JarState getState() {
        return state;
    }

    public UserViewDto getAuthor() {
        return author;
    }

    public JarPreviewDto withExtras(JarPreviewExtrasDto extras) {
        additionalInfos = extras;
        return this;
    }

    @Override
    public String toString() {
        return MessageFormat.format(
            "{ id: {0}, title: {1}, author: {2}, addressee: {3}, state: {4}, starting_date: {5}, closing_date: {6}, maximum_amount: {7}, extras: {8} }",
            id, title, author, addressee, state, startingDate, closingDate, maxAmount, additionalInfos);
    }

}
