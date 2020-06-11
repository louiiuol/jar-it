package dev.louiiuol.jarit.business.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.louiiuol.jarit.business.entities.User;

/**
 * Interface that extends {@code JpaRepository}
 * to handle {@code User} persistence.
 * 
 * @see JpaRepository
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Find {@code User} entity by their username.
     *
     * @param username User's name
     * @return {@code Optional<User>}
     */
    Optional<User> findByUsername(String username);

    /**
     * Find {@code User} entity by their id.
     *  
     * @param id User's identifier
     * @return {@code Optional<User>} 
     */
    Optional<User> getById(Long id);

    /**
     * Check if {@User} with given {@code Username} exists or not.
     *
     * @param username User's name
     * @return {@code true} if {@code Username} exists; {@code false} otherwise.
     */
    boolean existsByUsername(String username);

    /**
     * Check if {@User} with given {@code email} exists or not.
     *
     * @param email User's email
     * @return {@code true} if {@code email} exists; {@code false} otherwise.
     */
    boolean existsByEmail(String email);

    /**
     * Return a list of all ACTIVE Users in database
     *
     * @return {@code List<User>}
     */
	List<User> findByEnabledTrue();

}