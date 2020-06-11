package dev.louiiuol.jarit.business.repositories;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.louiiuol.jarit.business.entities.Member;

/**
 * Interface that extends {@code JpaRepository}
 * to handle {@code Member} persistence.
 * 
 * @see JpaRepository
 */
public interface MemberRepository extends JpaRepository<Member, Long> {

    /**
     * Find all {@code Member} entities by their jar's id.
     * 
     * @param tinneId Jar's identifier
     * @return {@code Set<Member>} if the id matches.
     */
    Set<Member> findAllByJarId(Long jarId);

    /**
     * Find all {@code Member} entities by their member's id.
     * 
     * @param memberId member's identifier
     * @return {@code Set<Member>} if the id matches.
     */
    Set<Member> findAllByUserId(Long memberId);

    /**
     * Find unique {@code Member} entities based on given user's id and jar's id
     * 
     * @param jarId jar's identifier
     * @param userId user's identifier
     * @return {@code Optional<Member>} entity
     */
    Optional<Member> findByJarIdAndUserId(Long jarId, Long userId);

    /**
     * Returns the numbers of {@code Member} entities related to given {@code User} id
     * <p>
     * In other words, this methods returns the total of Jars the given {@code User} is in.
     * 
     * @param id user's identifier
     * @return {@code Integer} given user's total jars
     */
    Integer countByUserId(Long id);

    /**
     * Returns the numbers of {@code Member} entities related to given {@code Jar} id
     * <p>
     * In other words, this methods returns the total of Users in the given {@code Jar}.
     * 
     * @param id jar's identifier
     * @return {@code Integer} given jar's total members
     */
    Integer countByJarId(Long jarId);

}
