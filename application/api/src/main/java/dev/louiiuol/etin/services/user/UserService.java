package dev.louiiuol.etin.services.user;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetailsService;

import dev.louiiuol.etin.models.dtos.requests.users.UserCreateDto;
import dev.louiiuol.etin.models.dtos.requests.users.UserUpdateDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDetailsDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDto;

/**
 * Interface to deal with {@code User} informations.
 * <ul>
 *  <li> Long {@link #create(UserCreateDto input)}
 *  <li> UserViewDto {@link #get(Long userId)}
 *  <li> UserViewDetailsDto {@link #getDetails(Long userId)}
 *  <li> void {@link #update(Long id, UserUpdateDto dto)}
 *  <li> void {@link #updatePassword(Long id, PasswordUpdateDto dto)}
 *  <li> void {@link #delete(Long id)}
 *  <li> Set<UserViewDto> {@link #getAll()}
 *  <li> Boolean {@link #existsByUsername(String username)}
 *  <li> Boolean {@link #existsByEmail(String email)}
 * </ul>
 */
public interface UserService extends UserDetailsService {

    /**
     * Creates new {@code User} based on given {@code UserCreateDto}
     * <ul>
     * <li>Encode and set password as BCryptPassword
     * <li>Add ROLE_USER by default
     * <li> Map as {@User} entity with ModelMapper
     * <li> Save in database via Jpa Repository
     * </ul>
     * 
     * @param dto User's information 
     * @return {@code Long} created User's identifier
     */
    public Long create(UserCreateDto UserCreateDto);

    /**
     * Return user matching the given id
     * 
     * @param userId User's identifier
     * @return {@code UserViewDto} */
    public UserViewDto get(Long userId);

    /**
     * Return user's details matching the given id
     * 
     * @param userId User's identifier
     * @return {@code UserViewDetailsDto} */
    public UserViewDetailsDto getDetails(Long userId);

    /**
     * Update user matching the given id with provided dto
     * 
     * @param id User's identifier
     * @param dto User's informations to update
     */
    public void update(Long id, UserUpdateDto UserUpdateDto);

    /**
     * Delete user matching the given id
     * 
     * @param id User's identifier
     */
    public void delete(Long id);

    /**
     * Return Pageable containing all users existing in database.
     * 
     * @return {@code Set<UserViewDto} All User present in database
     */
    public Set<UserViewDto> getAll();

    /**
     * Check if the {@code User} with given {@code email} is exists or not.
     * 
     * @param email string to test unicity on
     * @return {@code true} if {@code email} exists; {@code false} otherwise.
     */
    public boolean existsByEmail(String email);

    /**
     * Check if the {@code User} with given {@code username} is exists or not.
     * 
     * @param username string to test unicity on
     * @return {@code true} if {@code username} exists; {@code false} otherwise.
     */
    public boolean existsByUserName(String username);

}