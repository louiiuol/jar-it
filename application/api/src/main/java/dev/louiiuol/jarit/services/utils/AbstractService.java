package dev.louiiuol.jarit.services.utils;

import java.util.Collection;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.jarit.business.entities.AbstractEntity;

/**
 * <i>Abstract Service to be extended in every <b>business services</b> implementations</i>
 * <p>
 * This class <b> defines a contract </b> for every services that extends it,
 * most of basic methods are defined here to <b>simplify persistence</b>, with JPA,
 * and <b>mapping datas</b>, with ModelMapper, in Service's Implementations.
 * <p>
 * <i>When using this class please provide {@code T} Entity & {@code R} Repository</i>
 * 
 * @see ModelMapper
 * @see JpaRepository
 * @see Service Spring's service annotation
 */
@Service
public abstract class AbstractService<T extends AbstractEntity, R extends JpaRepository<T, Long>> {

    /**
     * Inject Model Mapper defined in MapperConfig into every services to convert dto
     * as entity & vice versa. Read 'config' folder for more informations
     */
    @Autowired
    private ModelMapper mapper;

    /**
     * Inject Services's repository as Generic to be used in following methods
    */
    private final R repo;

    /**
     * Define constructor with Service's repository
     * 
     * @param repository JpaRepository to inject
     */
    protected AbstractService(R repository) {
        repo = repository;
    }

    /**
     * Returns instance of {@code ModelMapper} to be used
     * for custom mapping in domain Services
     * 
     * @return new instance of {@code ModelMapper}
     */
    protected ModelMapper mapper() {
        return mapper;
    }

    /** 
     * Returns instance of {@code R Repository} to be used
     * for custom queries in domain Services
     * 
     * @return {@code R Repository}
     */
    protected R repo() {
        return repo;
    }

    /**
     * Fetching entity through repository and returns it if found
     * 
     * @param id entity's identifier
     * @throws ResourceNotFoundException
     * @return {@code T} entity
     */
    protected T getEntity(Long id) {
        Optional<T> option = repo.findById(id);
        return option.orElseThrow(ResourceNotFoundException::new);
    }

    /**
     * Return all entities from database mapped in specified {@code V} type
     * 
     * @param type ClassType to map into
     * @return {@code Set<V>} All entities of type {@code V} from databse
     */
    protected <V> Set<V> getAll(Class<V> type) {
        return mapSetView(repo.findAll(), type);
    }

    /**
     * Updates entity based on given DTO
     * <ul>
     * <li> Returns existing object stored in database with JPA
     * <li> Use ModelMapper to update existing entity brefore saving it
     * <li> JPA doesn't create => find existing data with same id, and upate it
     * </ul>
     * 
     * @param updateDto dto that will update entity
     * @param entityId entity to update identifier
     */
    protected <S> void updateEntityById(S updateDto, Long entityId) {
        T entity = getEntity(entityId);
        mapper().map(updateDto, entity);
        repo.save(entity);
    }

    /**
     * Return mapped entity in specified {@code V} type
     * 
     * @param entity Entity from JpaRepository
     * @param type targeted type for mapping
     * @return new instance of {@code V}
     */
    protected <V> V mapView(T entity, Class<V> type) {
        return mapper.map(entity, type);
    }

    /**
     * Return Set of mapped entities in specified {@code V} type
     * 
     * @param source list of entities to map
     * @param type targeted type for mapping
     * @return {@code Set<V>}
     */
    protected <V> Set<V> mapSetView(Collection<T> source, Class<V> type) {
        return source.stream()
            .map( entity -> mapper.map(entity, type) )
            .collect(Collectors.toUnmodifiableSet());
    }

}