package dev.louiiuol.etin.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import dev.louiiuol.etin.models.entities.Association;

/**
 * Interface that extends {@code JpaRepository} to handle {@code Association}
 * persistence.
 *
 * @see JpaRepository
 */
public interface AssociationRepository extends JpaRepository<Association, Long> {

    /**
     * Find {@code Association} entity by their id
     * 
     * @param associationId Association's identifier
     * @return {@code Optional<Association>}
     */
    Optional<Association> findById(Long associationId);

    /**
     * Find {@code Association} entity by their name.
     * 
     * @param name Association's name
     * @return {@code Optional<Association>}
     */
    Optional<Association> findByName(String name);

    /**
     * Return a list of all Associations present in database
     * 
     * @param pageable interface for pagination information
     * @return {@code List<AssociationAssociationViewDto>}
     */
    Page<Association> findAll(Pageable pageable);

    /**
     * Check if {@Association} with given {@code name} is exists or not.
     *  
     * @param name Association's name
     * @return {@code true} if {@code name} exists; {@code false} otherwise.
     */
    boolean existsByName(String name);

    /**
     * Check if {@Association} with given {@code code} is exists or not.
     *  
     * @param code Association's unique code
     * @return {@code true} if {@code code} exists; {@code false} otherwise.
     */
    boolean existsByCode(String code);

    /**
     * Returns the total count of {@Association} present in database.
     *  
     * @return {@code long} number of {@code Association} in database
     */
    long count();

}