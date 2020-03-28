package dev.louiiuol.etin.services.role;

import java.util.Set;

import dev.louiiuol.etin.models.entities.Role;

/**
 * Public Interface to deal with user's {@code Role} informations:
 * <b> This Service is meant to be use only by UserService & Validators </b>
 * <ul>
 * 	<li> Set<Role> {@link #getRoles(code)}
 * </ul>
 */
public interface RoleService {

    /**
     * Returns the {@code Role} corresponding to given code
     * 
     * @param code Role's string representation
     * @return {@code Set<ROle>} if exists
     */
    public Set<Role> getRoles(String code);

}