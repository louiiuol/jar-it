package dev.louiiuol.jarit.services.jars;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessDto;
import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessionViewDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberCreateDto;
import dev.louiiuol.jarit.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.jarit.business.dtos.PageDto;
import dev.louiiuol.jarit.business.dtos.jars.JarCreateDto;
import dev.louiiuol.jarit.business.dtos.jars.JarDetailsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarUpdateSettingsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto;
import dev.louiiuol.jarit.business.dtos.jars.JarPreviewExtrasDto;
import dev.louiiuol.jarit.business.entities.Confession;
import dev.louiiuol.jarit.business.entities.Jar;
import dev.louiiuol.jarit.business.entities.JarState;
import dev.louiiuol.jarit.business.entities.Member;
import dev.louiiuol.jarit.business.repositories.ConfessionRepository;
import dev.louiiuol.jarit.business.repositories.JarRepository;
import dev.louiiuol.jarit.business.repositories.MemberRepository;
import dev.louiiuol.jarit.services.jars.members.MemberService;
import dev.louiiuol.jarit.services.utils.AbstractService;
import dev.louiiuol.jarit.services.utils.SecurityHelper;

/**
 * Concrete implementation of {@code JarService} that extends
 * {@code AbstractService} to handle {@code Jar}
 * 
 * @see JarService
 * @see AbstractService
 * @see Service
 */
@Service
public class JarServiceImpl extends AbstractService<Jar, JarRepository> implements JarService {

    private final MemberRepository memberRepo;

    private final MemberService memberService;

    private final ConfessionRepository confessionRepo;

    protected JarServiceImpl(JarRepository repo, MemberRepository memberRepo, ConfessionRepository confessionRepo,
            MemberService memberService) {
        super(repo);
        this.confessionRepo = confessionRepo;
        this.memberRepo = memberRepo;
        this.memberService = memberService;
    }

    @Override
    public Long create(JarCreateDto dto) {
        Jar entity = mapper().map(dto, Jar.class); // Map Dto as Jar entity after checking author
        entity.getMembers().forEach(member -> member.setJar(entity));
        return repo().save(entity).getId(); // Store Jar in database & return its id
    }

    @Override
    public JarPreviewDto getPreview(Long id) {
        Jar entity = getEntity(id);
        Long userId = SecurityHelper.getUserId();
        return mapView(entity, JarPreviewDto.class).withExtras(getPreviewExtras(entity, userId));
    }

    @Override
    public JarDetailsDto getDetails(Long id) {
        Jar entity = getEntity(id);
        JarDetailsDto dto = mapView(entity, JarDetailsDto.class);
        dto.setBalance(getJarBalance(entity.getMembers()));
        return dto;
    }

    @Override
    public PageDto<JarPreviewDto> getAll(int page, int size, String order, String sort) {
        PageRequest pageReq = PageRequest.of(page, size, Sort.Direction.fromString(order), sort);
        Set<JarPreviewDto> dtos = mapSetView(repo().findAll(pageReq).toList(), JarPreviewDto.class);
        return new PageDto<>(repo().count(), dtos);
    }

    @Override
    public PageDto<JarPreviewDto> getAllByUser(Long id, int page, int size, String order, String sort) {
        PageRequest pageReq = PageRequest.of(page, size, Sort.Direction.fromString(order), sort);
        List<Jar> entities = repo().findAllByMembersUserId(id, pageReq).toList();
        List<JarPreviewDto> dtos = new ArrayList<>();
        for (Jar current : entities) {
            JarPreviewExtrasDto infos = getPreviewExtras(current, id);
            dtos.add(mapView(current, JarPreviewDto.class).withExtras(infos));
        }
        return new PageDto<>(repo().countByMembersUserId(id), dtos);
    }

    @Override
    public void updateSettings(Long id, JarUpdateSettingsDto dto) {
        updateEntityById(dto, id);
    }

    @Override
    public void updateMembers(Long id, List<Long> dtos) {
        Jar jar = getEntity(id);
        removeMembersNotPresentInDtos(dtos, jar);
        addRemainingMembers(dtos, jar.getId());
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

    @Override
    public Set<ConfessionViewDto> getJarConfessions(Long jarId) {
        Set<Confession> entities = confessionRepo.findAllByAuthorJarId(jarId);
        Set<ConfessionViewDto> dtos = new HashSet<>();
        entities.forEach(confession -> dtos.add(mapper().map(confession, ConfessionViewDto.class)));
        return dtos;
    }

    @Override
    public void updateConfession(Long confessionId, ConfessDto dto) {
        Confession confession = confessionRepo.findById(confessionId)
            .orElseThrow(ResourceNotFoundException::new);
        mapper().map(dto, confession);
        confessionRepo.save(confession);
    }

    private Double getJarBalance(List<Member> members) {
        return new HashSet<>(members).stream()
            .reduce(0.0, (accumulator, member) -> accumulator + member.getBalance(),
                Double::sum);
    }

    private Double confessionCost(Jar jar) {
        Double current = getJarBalance(jar.getMembers()); // Fetch current Jar balance
        Double cost = jar.getReferenceCost(); // Set Swear cost to ReferenceCost by default
        if (hasMaxAmountReached(jar, current)) { // If the max amount is reached, update state and save entity
            jar.setState(JarState.MAX_AMOUNT_REACHED);
            repo().save(jar); // Store jar with 'MAX AMOUNT REACHED' state
            cost = (jar.getMaxAmount() - current); // Math the max amount possible for the confession
        }
        return cost;
    }

    private void memberConfess(Long id, Double cost) {
        Member member = memberRepo.findById(id)
            .orElseThrow(ResourceNotFoundException::new);
        Double newBalance = Double.sum(member.getBalance(), cost);
        member.setBalance(newBalance);
        memberRepo.save(member);
    }

    private void saveConfession(ConfessDto dto) {
        Confession confession = mapper().map(dto, Confession.class);
        confessionRepo.save(confession);
    }

    private boolean hasMaxAmountReached(Jar jar, Double amount) {
        return Double.sum(amount, jar.getReferenceCost()) >= jar.getMaxAmount();
    }

    private JarPreviewExtrasDto getPreviewExtras(Jar jar, Long userId) {
        Double balance = getJarBalance(jar.getMembers());
        int confessionsCount = getJarConfessionsCount(jar.getMembers());
        boolean admin = memberService.isJarAdmin(jar.getId(), userId);
        return new JarPreviewExtrasDto(balance, jar.getMembers().size(), confessionsCount, admin);
    }

    private int getJarConfessionsCount(List<Member> members) {
        return members.stream()
            .reduce(0, (accumulator, member) -> accumulator + member.getConfessions().size(), Integer::sum);
    }

    private void removeMembersNotPresentInDtos(List<Long> dtos, Jar jar) {
        Long authorId = jar.getAuthor().getId();
        Iterator<Member> iterator = jar.getMembers().iterator();
        while (iterator.hasNext()) {
            Long userId = iterator.next().getUser().getId();
            if (dtos.contains(userId)) {
                dtos.remove(userId);
            } else if (!authorId.equals(userId)) {
                iterator.remove();
            }
        }
        repo().save(jar);
    }

    private void addRemainingMembers(List<Long> dtos, Long jarId) {
        for (Long userId : dtos) {
            MemberCreateDto dto = new MemberCreateDto(jarId, userId, false);
            Member entity = mapper().map(dto, Member.class);
            memberRepo.save(entity);
        }
    }

}