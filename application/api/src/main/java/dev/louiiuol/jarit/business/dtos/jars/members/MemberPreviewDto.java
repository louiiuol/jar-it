package dev.louiiuol.jarit.business.dtos.jars.members;

import java.text.MessageFormat;

/**
 * DTO representing the {@code MemberPreviewDto}
 * to display {@code Member} basic informations
 * needed for visual purpose
 * 
 */
public class MemberPreviewDto {

    protected Long id;

    protected Long userId;

    protected String avatar;

    protected String username;

    protected MemberPreviewDto() {
        // Overrides default no-args constructor as protected
    }

    public MemberPreviewDto(Long id, String avatar, String username) {
        this.userId = id;
        this.avatar = avatar;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ user_id: {0}, username: {1}, avatar: {2} }",
            userId, username, avatar);
    }

}