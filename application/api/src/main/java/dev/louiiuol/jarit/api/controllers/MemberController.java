package dev.louiiuol.jarit.api.controllers;

import java.util.Set;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.louiiuol.jarit.business.dtos.jars.members.MemberDetailsDto;
import dev.louiiuol.jarit.services.jars.members.MemberService;

/**
 * This class exposes REST API containing multiple CRUD
 * request to handle Jar's {@code Member} informations.
 * 
 * @see RestController
 * @see ControllerAdvice
 * @see Valid
 * @see PreAuthorize
 */
@RestController
@RequestMapping("/secure/jars")
public class MemberController {

    private final MemberService service;

    protected MemberController(MemberService service) {
        this.service = service;
    }

    @GetMapping("/{jar}/members")
	@PreAuthorize("@validatorService.isJarMember(#jarId)")
    public Set<MemberDetailsDto> getJarMembers(@PathVariable("jar") Long jarId) {
        return service.getAllByJar(jarId);
    }

}