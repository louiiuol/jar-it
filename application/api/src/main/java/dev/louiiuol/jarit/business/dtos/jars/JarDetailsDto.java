package dev.louiiuol.jarit.business.dtos.jars;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Set;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationViewDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberDetailsDto;
import dev.louiiuol.jarit.business.dtos.users.UserViewDto;

/**
 * DTO representing the {@code JarPreviewDto}
 * to display {@code Jar} Preview informations
 * 
 * @see EntityIdDto
 */
public class JarDetailsDto {

    private Long id;

    private String title;

    private String description;

    private UserViewDto author;

    private AssociationViewDto addressee;

    private LocalDate startDate;

    private LocalDate closingDate;

    private String state;

    private Long maxAmount;

    private Long referenceCost;

    private Double balance;

    private Set<MemberDetailsDto> members;

    protected JarDetailsDto() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Retrieve current state of the Jar
     * 
     * @return state defining features of the Jar
     */
    public String getState() {
        return state;
    }

    public UserViewDto getAuthor() {
        return author;
    }

    public Set<MemberDetailsDto> getMembers() {
        return members;
	}

    public void setBalance(Double balance) {
        this.balance = balance;
	}

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, title: {1}, author: {2}, addressee: {3}, state: {4}, balance: {5}, starting_date: {6}, closing_date: {7}, description: {8}, maximum_amount: {9}, reference_cost: {10}, members: {11} }",
            id, title, author, addressee, state, balance, startDate, closingDate, description, maxAmount, referenceCost, members);
    }

}
