package dev.louiiuol.jarit.services.jars;

import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberCreateDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberUpdateDto;
import dev.louiiuol.jarit.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.jarit.business.dtos.jars.JarCreateDto;
import dev.louiiuol.jarit.business.dtos.jars.JarDetailsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarUpdateSettingsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto;
import dev.louiiuol.jarit.business.entities.Confession;
import dev.louiiuol.jarit.business.entities.Jar;
import dev.louiiuol.jarit.business.entities.JarState;
import dev.louiiuol.jarit.business.entities.Member;
import dev.louiiuol.jarit.business.repositories.ConfessionRepository;
import dev.louiiuol.jarit.business.repositories.JarRepository;
import dev.louiiuol.jarit.business.repositories.MemberRepository;
import dev.louiiuol.jarit.services.utils.AbstractService;

/**
 * Concrete implementation of {@code JarService}
 * that extends {@code AbstractService} to handle {@code Jar}
 * 
 * @see JarService
 * @see AbstractService
 * @see Service
 */
@Service
public class JarServiceImpl extends AbstractService<Jar, JarRepository>
    implements JarService {

    private final MemberRepository memberRepo;

    private final ConfessionRepository confessionRepo;

    protected JarServiceImpl(JarRepository repo, MemberRepository memberRepo, ConfessionRepository confessionRepo) {
        super(repo);
        this.confessionRepo = confessionRepo;
        this.memberRepo = memberRepo;
    }

    @Override
    public Long create(JarCreateDto dto) {
        Jar entity = mapper().map(dto, Jar.class); // Map Dto as Jar entity after checking author
        entity.getMembers().forEach(member -> member.setJar(entity));
        return repo().save(entity).getId(); // Store Jar in database & return its id
    }

    @Override
    public JarPreviewDto getPreview(Long id) {
        return repo().getPreview(id);
    }

    @Override
    public JarDetailsDto getDetails(Long id) {
        Jar entity = getEntity(id);
        JarDetailsDto dto = mapView(entity, JarDetailsDto.class);
        dto.setBalance(getJarBalance(entity));
        return dto;
    }

    @Override
    public List<JarPreviewDto> getAll() {
        return repo().getAll();
    }


    @Override
    public List<JarPreviewDto> getAllByUser(Long id) {
        return repo().findAllByUserId(id);
    }

    @Override
    public void updateSettings(Long id, JarUpdateSettingsDto dto) {
        updateEntityById(dto, id);
    }

    @Override
    public void updateMembers(Long id, List<MemberUpdateDto> dtos) {
        Jar jar = getEntity(id);
        for (MemberUpdateDto dto : dtos) {
            for (Member member : jar.getMembers()) {
                if (member.getUser().getId().equals(dto.getUser().getId())) {
                    updateEntityById(dto, member.getUser().getId());
                } else {
                    MemberCreateDto entity = new MemberCreateDto(jar.getId(), dto.getUser().getId(), dto.getAdmin());
                    memberRepo.save(mapper().map(entity, Member.class));
                }
            }
        }
    }

    @Override
    public void activate(Long id) {
        Jar jar = getEntity(id); // Fetch corresponding jar for further verifications & updates
        jar.setState(JarState.ACTIVE); // Set Jar state as ACTIVE
        repo().save(jar); // Save updated Jar in repository with JPA
    }

    @Override
    public void confess(Long jarId, ConfessDto dto) {
        Jar jar = getEntity(jarId); // Fetch corresponding jar for further verifications & updates
        Double cost = confessionCost(jar);
        memberConfess(dto.getAuthor().getId(), cost);
        saveConfession(dto);
    }

    private Double getJarBalance(Jar jar) {
        return new HashSet<>(jar.getMembers()).stream().reduce(0.0,
                (accumulator, member) -> accumulator + member.getBalance(), Double::sum);
    }

    private Double confessionCost(Jar jar) {
        Double current = getJarBalance(jar); // Fetch current Jar balance
        Double cost = jar.getReferenceCost(); // Set Swear cost to ReferenceCost by default
        if (hasMaxAmountReached(jar, current)) { //If the max amount is reached, update state and save entity
            jar.setState(JarState.MAX_AMOUNT_REACHED);
            repo().save(jar); // Store jar with 'MAX AMOUNT REACHED' state
            cost = (jar.getMaxAmount() - current); // Math the max amount possible for the confession
        }
        return cost;
    }

    private void memberConfess(Long id, Double cost) {
        Member member = memberRepo.findById(id).orElseThrow(ResourceNotFoundException::new);
        Double newBalance = Double.sum(member.getBalance(), cost);
        member.setBalance(newBalance);
        memberRepo.save(member);
    }

    private void saveConfession(ConfessDto dto) {
        Confession confession = mapper().map(dto, Confession.class);
        confessionRepo.save(confession);
    }

    private boolean hasMaxAmountReached(Jar jar, Double amount) {
        return Double.sum( amount, jar.getReferenceCost() ) >= jar.getMaxAmount();
    }

}