package dev.louiiuol.jarit.business.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.louiiuol.jarit.business.entities.Confession;
/**
 * Interface that extends {@code JpaRepository}
 * to handle {@code Confession} persistence.
 * 
 * @see JpaRepository
 */
public interface ConfessionRepository extends JpaRepository<Confession, Long> {

    /**
     * Find all {@code Confession} entities by their user's id.
     * 
     * @param userId user's identifier
     * @return Set<Confession> if the id matches.
     */
    Set<Confession> findAllByAuthorId(Long userId);

    /**
     * Find all {@code Confession} entities by their user's id.
     * 
     * @param jarId jar's identifier
     * @return Set<Confession> if the id matches.
     */
    Set<Confession> findAllByAuthorJarId(Long jarId);

}