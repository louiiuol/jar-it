package dev.louiiuol.jarit.business.dtos.jars.members;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.Set;

import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessionViewDto;

/**
 * DTO representing the {@code MemberViewDetailsDto}
 * to display {@code Member} detailed informations
 * needed for internal logic
 * 
 * @see MemberViewDto
 */
public class MemberDetailsDto extends MemberPreviewDto {

    private Double balance;

    private LocalDateTime joined;

    private Boolean admin;

    private Boolean payed;

    private Set<ConfessionViewDto> confessions;

    protected MemberDetailsDto() {
        // Overrides default no-args constructor as protected
    }

    public Boolean isAdmin() {
        return admin;
    }

    public Double getBalance() {
        return balance;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ user_id: {0}, username: {1}, avatar: {2}, balance: {3}, admin: {4}, joined: {5}, payed: {6}, confessions: {7} }",
            userId, username, avatar, balance, admin, joined, payed, confessions);
    }

}