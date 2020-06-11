package dev.louiiuol.jarit.business.dtos.jars;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberCreateDto;
import dev.louiiuol.jarit.business.entities.JarState;

/**
 * DTO representing the {@code JarCreateDto}
 * to create new {@code Jar}
 */
public class JarCreateDto {

    @NotBlank
    private String title;

    @Size(max=280)
    private String description;

    @NotNull
    private LocalDate closingDate; 

    @NotNull
    private EntityIdDto author;

    @NotNull
    private EntityIdDto addressee;

    @NotNull
    private Double maxAmount;

    @NotNull
    private Double referenceCost;

    @NotNull
    private List<MemberCreateDto> members;

    @JsonIgnore
    private JarState state = JarState.CREATED;

    protected JarCreateDto() {
        // Overrides default no-args constructor as protected
    }

    @Override
    public String toString() {
        return MessageFormat.format(
            "{ title: {0}, description: {1}, author: {2}, sate: {3}, reference_cost: {4}, max_amount: {5}, closing_date: {6}, addressee: {7}, members: {8} }",
            title, description, author.getId(), state, referenceCost, maxAmount, closingDate, addressee.getId(), members);
    }

}