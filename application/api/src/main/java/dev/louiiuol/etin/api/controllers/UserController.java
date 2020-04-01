package dev.louiiuol.etin.api.controllers;

import java.util.Set;

import javax.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dev.louiiuol.etin.services.utils.SecurityHelper;
import dev.louiiuol.etin.models.dtos.requests.users.UserCreateDto;
import dev.louiiuol.etin.models.dtos.requests.users.UserUpdateDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDetailsDto;
import dev.louiiuol.etin.models.dtos.responses.users.UserViewDto;
import dev.louiiuol.etin.services.user.UserService;

/** 
 * This class exposes REST API containing multiple CRUD request
 * to handle {@code User} and {@code Authentication} informations.
 * 
 * @see RestController
 * @see ControllerAdvice
 * @see Valid
 * @see PreAuthorize
 */
@RestController
public class UserController  extends ControllerAdvice {

	private final UserService service;

	protected UserController(UserService service) {
		this.service = service;
	}

	@PostMapping("auth/signup")
	public Long create(@Valid @RequestBody UserCreateDto dto) { return service.create(dto); }

	@PreAuthorize("hasRole('USER')")
	@GetMapping("secure/users/{id}")
	public UserViewDto get(@PathVariable("id") Long id) { return service.get(id); }

	@PreAuthorize("hasRole('USER')")
	@GetMapping("secure/users/{id}/details")
	public UserViewDetailsDto getDetails(@PathVariable("id") Long id) { return service.getDetails(id); }

	@PreAuthorize(" ( hasRole('USER') and @validatorService.validRequester(#id) ) or hasRole('ADMIN')")
	@PutMapping("secure/users/{id}")
	public void update(@PathVariable("id") Long id, @Valid @RequestBody UserUpdateDto dto) { service.update(id, dto); }

	@PreAuthorize(" ( hasRole('USER') and @validatorService.validRequester(#id) ) or hasRole('ADMIN')")
	@DeleteMapping("secure/users/{id}")
	public void delete(@PathVariable("id") Long id) { service.delete(id); }

	@PreAuthorize("hasRole('USER')")
	@GetMapping("secure/users")
	public Set<UserViewDto> getAll() { return service.getAll(); }

	@PreAuthorize("hasRole('USER') and @validatorService.validRequester(#id)")
    @GetMapping("/secure/whoami")
    public UserViewDetailsDto userInfo() { return service.getDetails( SecurityHelper.getUserId() );}

}