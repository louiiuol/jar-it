package dev.louiiuol.jarit.business.dtos.jars;

import java.text.MessageFormat;
import java.time.LocalDate;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;
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

    private String addressee;

    private LocalDate startDate;

    private LocalDate closingDate;

    private JarState state;

    private Double balance;

    private Long membersCount;

    private Double maxAmount;

    protected JarPreviewDto() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Complete constrcutor used by JPQL Query
     * 
     * @param id Jar's identifier
     * @param closingDate Jar's closing date
     * @param maxAmount Jar's maximum amount allowed
     * @param state Jar's current state
     * @param title Jar's title
     * @param addressee Jar's association addressee
     * @param authorId Jar's author identifier
     * @param username Jar's author username
     * @param avatar Jar's author avatar
     * @param membersCount Jar's member length
     * @param balance Jar's current balance
     * @param startDate Jar's creation date
     */
    public JarPreviewDto(Long id, LocalDate closingDate, Double maxAmount, JarState state, String title,
            String addressee, Long authorId, String username, String avatar, Long membersCount, Double balance,
            LocalDate startDate) {
        this.id = id;
        this.closingDate = closingDate;
        this.maxAmount = maxAmount;
        this.state = state;
        this.title = title;
        this.addressee = addressee;
        this.author = new UserViewDto(authorId, avatar, username);
        this.membersCount = membersCount;
        this.balance = balance;
        this.startDate = startDate;
    }

    public JarState getState() {
        return state;
    }

    public UserViewDto getAuthor() {
        return author;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, title: {1}, author: {2}, addressee: {3}, state: {4}, balance: {5}, starting_date: {6}, closing_date: {7}, members_length: {8}, maximum_amount: {9} }",
            id, title, author, addressee, state, balance, startDate, closingDate, membersCount, maxAmount);
    }

}
