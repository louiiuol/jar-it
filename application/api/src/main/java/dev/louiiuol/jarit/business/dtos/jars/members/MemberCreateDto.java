package dev.louiiuol.jarit.business.dtos.jars.members;

import java.text.MessageFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;

import dev.louiiuol.jarit.business.dtos.EntityIdDto;

/**
 * DTO representing the {@code MemberCreateDto}
 * to create new {@code Member}
 * 
 * @see UniqueMember
 */
public class MemberCreateDto {

    private EntityIdDto user;

    private EntityIdDto jar;

    private boolean admin;

    @JsonIgnore
    private double balance = 0.00;

    @JsonIgnore
    private boolean payed = false;

    protected MemberCreateDto() {
        // Overrides default no-args constructor as protected
    }
    
    public MemberCreateDto(Long jar, Long user, Boolean admin) {
        this.user = new EntityIdDto(user);
        this.jar = new EntityIdDto(jar);
        this.admin = admin;
	}

	public Long getMember() {
        return user.getId();
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ user: {0}, jar: {1} balance: {2}, admin: {3}, payed: {4} } ",
            user, jar, balance, admin, payed);
    }

}