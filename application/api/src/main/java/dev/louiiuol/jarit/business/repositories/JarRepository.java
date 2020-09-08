package dev.louiiuol.jarit.business.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import dev.louiiuol.jarit.business.entities.Jar;

public interface JarRepository extends JpaRepository<Jar, Long> {

    /**
     * Find {@code Jar} entity by its Id.
     * 
     * @param JarId Jar's identifier
     * @return {@code Optional<Jar>}
     */
    Optional<Jar> findById(Long id);

    /**
     * Return a list of all Jars present in database
     * as a {@code Page} container.
     * 
     * @param page interface for pagination information
     * @return {@code Page<Jar>}
     */
    Page<Jar> findAll(Pageable page);

    /**
     * Find all {@code Jar} entities by its member Id.
     * 
     * @param id Jar member's identifier
     * @return {@code Page<Jar>}
     */
    Page<Jar> findAllByMembersUserId(@Param("id") Long id, Pageable page);

    /**
     * Returns the total count of User's {@Jar} present in database.
     *  
     * @param id user's member identifier
     * @return {@code long} number of {@code Association} in database
     */
    long countByMembersUserId(Long id);
    
    /**
     * Returns the total count of {@Jar} present in database.
     *  
     * @return {@code long} number of {@code Association} in database
     */
    long count();

    long countByAddresseeId(Long id);

}