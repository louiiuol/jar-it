package dev.louiiuol.jarit.api.controllers;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import dev.louiiuol.jarit.business.dtos.associations.AssociationCreateDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationViewDto;
import dev.louiiuol.jarit.business.dtos.associations.AssociationPageDto;
import dev.louiiuol.jarit.services.association.AssociationService;
/** 
 * This class exposes REST API containing multiple CRUD request
 * to handle {@code Tinee}, {@code Member} and {@code Swear} informations.
 * 
 * @see RestController
 * @see ControllerAdvice
 * @see Valid
 * @see PreAuthorize
 */
@RestController
@RequestMapping("/secure/associations")
public class AssociationController {

	private final AssociationService service;

	protected AssociationController(AssociationService service) {
		this.service = service;
	}

	@PostMapping
	@PreAuthorize("hasRole('ADMIN')")
	public Long create(@Valid @RequestBody AssociationCreateDto dto) {
		return service.create(dto);
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public void delete(@PathVariable("id") Long id) {
		service.delete(id);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER')")
	public AssociationViewDto get(@PathVariable("id") Long id) {
		return service.get(id);
	}

	@GetMapping()
	@PreAuthorize("hasRole('USER')")
	public AssociationPageDto getAll(
		UriComponentsBuilder uriBuilder,
		HttpServletResponse response,
		@RequestParam(defaultValue = "0") int page,
		@RequestParam(defaultValue = "5") int size,
		@RequestParam(defaultValue = "asc") String order,
		@RequestParam(defaultValue = "id") String sort) {
			return service.getAll(page, size, order, sort);
	}

}