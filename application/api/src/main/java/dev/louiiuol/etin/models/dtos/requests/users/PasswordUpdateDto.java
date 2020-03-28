package dev.louiiuol.etin.models.dtos.requests.users;

import java.text.MessageFormat;

/**
 * DTO representing the {@code PasswordUpdateDto}
 * to update existing {@code User}'s password
 */
public class PasswordUpdateDto {

    protected PasswordUpdateDto() {/*Overrides default constructor as protected without arguments*/}

    private String password;

    @Override
    public String toString() {
        return MessageFormat.format("PasswordUpdateDTO: [password: {}]", password);
    }

}