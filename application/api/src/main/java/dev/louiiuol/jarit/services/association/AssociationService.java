package dev.louiiuol.jarit.services.association;

import dev.louiiuol.jarit.business.dtos.associations.AssociationCreateDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationPageDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationViewDto;

/**
 * Interface to deal with {@code Association} informations.
 * <p>
 * Declares CRUD Services contracts: params & returns. Complete
 * implementation is available in the concrete class associated.
 */
public interface AssociationService {

    /**
     * Map new {@code Association} entity from given dto
     * using custom {@code ModelMapper}.
     * <p>
     * Once mapped, the entity is stored in database using {@code JPA}
     * 
     * @param dto : {@code AssociationCreateDto}
     * @return <b>Long</b> : id of the created Association
     */
    public Long create(AssociationCreateDto dto);

    /**
     * Get specific {@code Association}, based on given id
     * 
     * @param id : {@code Association} identifier
     * @return <b>AssociationViewDto</b> : {@code Association} general informations
     */
    public AssociationViewDto get(Long id);

    /**
     * Delete {@code Association}, based on given id
     * 
     * @param id : {@code Association} identifier
     */
    public void delete(Long id);

    /**
     * Get all {@code Association} present in database
     * 
     * @param page : starting page of the pagination
     * @param size : number of element per page
     * @param order : sorting direction (ASC - DESC)
     * @param sort : property on which sorting will apply
     * @return <b>AssociationPageDto</b> dto wrapping {@code AssociationViewDto} as List
     */
    public AssociationPageDto getAll(int page, int size, String order, String sort);

    /**
     * Check if specific {@code Association} already
     * exists in database with given name
     * 
     * @param name : {@code Association}'s name
     * @return {@code boolean} : true if exists, false otherwise
     */
    public boolean existsByName(String name);

    /**
     * Check if specific {@code Association} already
     * exists in database with given code
     * 
     * @param code : {@code Association}'s code
     * @return {@code boolean} : true if exists, false otherwise
     */
    public boolean existsByCode(String code);

}