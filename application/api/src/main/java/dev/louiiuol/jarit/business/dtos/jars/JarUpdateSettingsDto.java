package dev.louiiuol.jarit.business.dtos.jars;

import java.text.MessageFormat;
import java.time.LocalDate;

import javax.validation.constraints.Size;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code JarUpdateDto}
 * to update existing {@code Jar}
 */
public class JarUpdateSettingsDto extends EntityIdDto {

    private static final long serialVersionUID = 2714904007315634699L;

    private String title;

    @Size(max=280)
    private String description;

    private LocalDate closingDate; 

    private EntityIdDto addressee;

    private Double maxAmount;

    private Double referenceCost;

    protected JarUpdateSettingsDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ title: {0}, description: {1}, reference_cost: {2}, max_amount: {3}, end_date: {4}, addressee: {5} }",
            title, description, referenceCost, maxAmount, closingDate, addressee.getId());
    }

}