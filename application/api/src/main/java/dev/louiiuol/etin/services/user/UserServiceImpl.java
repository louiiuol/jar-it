package dev.louiiuol.etin.services.user;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import dev.louiiuol.etin.models.dtos.requests.users.UserCreateDto;
import dev.louiiuol.etin.models.dtos.requests.users.UserUpdateDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDetailsDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDto;
import dev.louiiuol.etin.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.etin.models.entities.User;
import dev.louiiuol.etin.repositories.UserRepository;
import dev.louiiuol.etin.services.role.RoleService;
import dev.louiiuol.etin.services.utils.AbstractService;

/**
 * Concrete implementation of {@code UserService}
 * that extends {@code AbstractService} to handle {@code User} persistence
 * 
 * @see UserService
 * @see AbstractService
 * @see Service
 */
@Service
public class UserServiceImpl extends AbstractService<User, UserRepository>
    implements UserService {

    @Autowired
    private PasswordEncoder encoder;

    private final RoleService roleService;

    private static final String USER_ROLE = "ROLE_USER";

    protected UserServiceImpl(UserRepository repo, RoleService roleService) {
        super(repo);
        this.roleService = roleService;
    }

    @Override
    public UserViewDto get(Long id) {
        return mapView(getEntity(id), UserViewDto.class);
    }

    @Override
    public UserViewDetailsDto getDetails(Long id) {
        return mapView(getEntity(id), UserViewDetailsDto.class);
    }

    @Override
    public void update(Long id, UserUpdateDto dto) {
        updateEntityById(dto, id);
    }

    @Override
    public void close(Long id) {
        User current = repo().getById(id).orElseThrow(ResourceNotFoundException::new);
        current.close();
        updateEntityById(current, id);
    }

    @Override
    public Set<UserViewDto> getAll() {
        return mapSetView(repo().findByEnabledTrue(), UserViewDto.class);
    }

    @Override
    public boolean existsByEmail(String email) {
        return repo().existsByEmail(email);
    }

    @Override
    public boolean existsByUserName(String username) {
        return repo().existsByUsername(username);
    }

    @Override
    public Long create(UserCreateDto dto) {
        dto.setPassword(encoder.encode( dto.getPassword() ) );
        dto.setRoles(roleService.getRoles(USER_ROLE));
        User entity = mapper().map(dto, User.class);
        return repo().save( entity ).getId();
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = repo().findByUsername(username) // Request User with his username using JPA
            .orElseThrow(ResourceNotFoundException::new); // Check if  User is found
        return new dev.louiiuol.etin.models.entities.UserDetails(user); // Return custom version of Spring's UserDetails entity
    }

}