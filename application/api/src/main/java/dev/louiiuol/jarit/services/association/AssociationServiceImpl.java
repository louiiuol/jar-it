package dev.louiiuol.jarit.services.association;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;



import dev.louiiuol.jarit.business.dtos.associations.AssociationCreateDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationPageDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationViewDto;
import dev.louiiuol.jarit.business.entities.Association;
import dev.louiiuol.jarit.business.repositories.AssociationRepository;
import dev.louiiuol.jarit.services.utils.AbstractService;

/**
 * Concrete implementation of {@code AssociationService} that extends
 * {@code AbstractService} to handle {@code Association}
 * 
 * @see AssociationService
 * @see AbstractService
 * @see Service
 */
@Service
public class AssociationServiceImpl extends AbstractService<Association, AssociationRepository>
    implements AssociationService {

    protected AssociationServiceImpl(AssociationRepository repo) {
        super(repo);
    }

    @Override
    public Long create(AssociationCreateDto dto) {
        Association entity = mapper().map(dto, Association.class);
        return repo().save(entity).getId();
    }

    @Override
    public AssociationViewDto get(Long id) {
        return mapView( getEntity(id), AssociationViewDto.class);
    }

    @Override
    public void delete(Long id) {
        repo().deleteById(id);
    }

    @Override
    public AssociationPageDto getAll(int page, int size, String order, String sort) {
        PageRequest pageReq = PageRequest.of(page, size, Sort.Direction.fromString(order), sort);
        List<AssociationViewDto> dtos = new ArrayList<>();
        List<Association> entities = repo().findAll(pageReq).toList();
        entities.forEach(entity -> dtos.add(mapView(entity, AssociationViewDto.class)));
        return new AssociationPageDto(repo().count(), dtos);
    }

    @Override
    public boolean existsByName(String name) {
        return repo().existsByName(name);
    }
    
    @Override
    public boolean existsByCode(String code) {
        return repo().existsByCode(code);
    }

}