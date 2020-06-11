package dev.louiiuol.jarit.api.controllers;

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

import dev.louiiuol.jarit.services.utils.SecurityHelper;
import dev.louiiuol.jarit.business.dtos.users.UserCreateDto;
import dev.louiiuol.jarit.business.dtos.users.UserUpdateDto;
import dev.louiiuol.jarit.business.dtos.users.UserViewDetailsDto;
import dev.louiiuol.jarit.business.dtos.users.UserViewDto;
import dev.louiiuol.jarit.services.user.UserService;

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
public class UserController {

	private final UserService service;

	protected UserController(UserService service) {
		this.service = service;
	}

	@PostMapping("auth/signup")
	public Long create(@Valid @RequestBody UserCreateDto dto) {
		return service.create(dto);
	}

	@PreAuthorize("hasRole('USER')")
	@GetMapping("secure/users/{id}")
	public UserViewDto get(@PathVariable("id") Long id) {
		return service.get(id);
	}
	
	@PreAuthorize("hasRole('USER')")
	@GetMapping("secure/users")
	public Set<UserViewDto> getAll() {
		return service.getAll();
	}

	@PreAuthorize(" ( hasRole('USER') and @validatorService.validRequester(#id) ) or hasRole('ADMIN') ")
	@PutMapping("secure/users/{id}")
	public void update(@PathVariable("id") Long id, @Valid @RequestBody UserUpdateDto dto) {
		service.update(id, dto);
	}

	@PreAuthorize(" ( hasRole('USER') and @validatorService.validRequester(#id) ) or hasRole('ADMIN')")
	@DeleteMapping("secure/users/{id}")
	public void close(@PathVariable("id") Long id) {
		service.close(id);
	}

	@PreAuthorize("hasRole('USER')")
    @GetMapping("secure/whoami")
	public UserViewDetailsDto userInfo() {
		return service.getDetails(SecurityHelper.getUserId());
	}

}