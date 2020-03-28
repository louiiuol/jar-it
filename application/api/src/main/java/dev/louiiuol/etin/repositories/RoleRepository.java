package dev.louiiuol.etin.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.louiiuol.etin.models.entities.Role;

/**
 * Interface that extends {@code JpaRepository}
 * to handle {@code Role} persistence.
 *
 * @see JpaRepository 
 */
public interface RoleRepository  extends  JpaRepository<Role, Long> {

	/**
      * Find {@code Report} with given {@code code}
      *
      * @param code String representation of role
      * @return {@code Optional<Role>}
      */
	Optional<Role> findByCode(String code);

}