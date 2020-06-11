package dev.louiiuol.jarit.business.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto;
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
     * Find {@code Jar} entity by its Author.
     * 
     * @param authorId Jar author's identifier
     * @return {@code Optional<Jar>}
     */
    List<Jar> findAllByAuthorId(Long authorId);

    /**
     * Return a list of all Jars present in database
     * as a {@code Page} container.
     * 
     * @param page interface for pagination information
     * @return {@code Page<Jar>}
     */
    @Query("SELECT new dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto("+
    "j.id, j.closingDate, j.maxAmount, j.state, j.title, j.addressee.name, " +
    "j.author.id, j.author.username, j.author.avatar, COUNT(m), SUM(m.balance), j.startDate ) FROM Member m " +
    "JOIN Jar j ON j.id = m.jar.id GROUP BY j.id")
    List<JarPreviewDto> getAll();

    @Query("SELECT new dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto("+
        "j.id, j.closingDate, j.maxAmount, j.state, j.title, j.addressee.name, " +
        "j.author.id, j.author.username, j.author.avatar, COUNT(m), SUM(m.balance), j.startDate ) FROM Member m " +
        "JOIN Jar j ON j.id = m.jar.id " +
        " WHERE j.id IN (SELECT jar.id FROM Jar jar JOIN Member mem ON jar.id = mem.jar WHERE mem.user.id = :id) " +
        "GROUP BY j.id")
    List<JarPreviewDto> findAllByUserId(@Param("id") Long id);

    @Query("SELECT new dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto("+
    "j.id, j.closingDate, j.maxAmount, j.state, j.title, j.addressee.name, " +
    "j.author.id, j.author.username, j.author.avatar, COUNT(m), SUM(m.balance), j.startDate ) FROM Member m " +
    "JOIN Jar j ON j.id = m.jar.id WHERE j.id = :id")
    JarPreviewDto getPreview(Long id);

}