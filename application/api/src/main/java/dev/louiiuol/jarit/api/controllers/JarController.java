package dev.louiiuol.jarit.api.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.louiiuol.jarit.business.dtos.jars.JarCreateDto;
import dev.louiiuol.jarit.business.dtos.jars.JarDetailsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarUpdateSettingsDto;
import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberUpdateDto;
import dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto;
import dev.louiiuol.jarit.services.jars.JarService;

/**
 * This class exposes REST API containing multiple CRUD request
 * to handle {@code Jar} informations.
 * 
 * @see RestController
 * @see ControllerAdvice
 * @see Valid
 * @see PreAuthorize
 */
@RestController
@RequestMapping("secure/jars")
@PreAuthorize("hasRole('USER')")
public class JarController {

    private final JarService service;

    protected JarController(JarService service) {
        this.service = service;
    }

    @PostMapping
    public Long createJar(@Valid @RequestBody JarCreateDto input) {
        return service.create(input);
    }

    @GetMapping("/{id}")
    @PreAuthorize("@validatorService.isJarMember(#id)")
    public JarPreviewDto getJarPreview(@PathVariable("id") Long id) {
        return service.getPreview(id);
    }

    @GetMapping("/{id}/details")
    @PreAuthorize("@validatorService.isJarMember(#id)")
    public JarDetailsDto getJarDetails(@PathVariable("id") Long id) {
        return service.getDetails(id);
    }

    @GetMapping("users/{id}")
	@PreAuthorize("@validatorService.validRequester(#id)")
    public List<JarPreviewDto> getUserJars(@PathVariable("id") Long id) {
        return service.getAllByUser(id);
    }

    @PutMapping("/{id}/settings")
	@PreAuthorize("@validatorService.isJarAdmin(#id) AND @validatorService.isCreated(#id)")
    public void updateJarSettings(@PathVariable("id") Long id, @Valid @RequestBody JarUpdateSettingsDto dto) {
        service.updateSettings(id, dto);
    }

    @PutMapping("/{id}/members")
	@PreAuthorize("@validatorService.isJarAdmin(#id) AND @validatorService.isCreated(#id)")
    public void updateJarMembers(@PathVariable("id") Long id, @Valid @RequestBody List<MemberUpdateDto> dto) {
        service.updateMembers(id, dto);
    }

    @GetMapping("/{id}/activate")
    @PreAuthorize("@validatorService.isJarAuthor(#id)")
    public void activateJar(@PathVariable("id") Long id) {
        service.activate(id);
    }

    @PostMapping("/{id}/confess")
	@PreAuthorize("@validatorService.isActive(#jarId) and @validatorService.isJarMember(#jarId)")
    public void confess(@PathVariable("id") Long jarId, @Valid @RequestBody ConfessDto dto) {
        service.confess(jarId, dto);
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<JarPreviewDto> getAllJars() {
        return service.getAll();
    }

}