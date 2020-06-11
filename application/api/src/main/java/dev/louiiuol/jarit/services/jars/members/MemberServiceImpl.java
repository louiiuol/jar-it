package dev.louiiuol.jarit.services.jars.members;

import java.util.Set;

import org.springframework.stereotype.Service;

import dev.louiiuol.jarit.api.exceptions.ResourceNotFoundException;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberDetailsDto;
import dev.louiiuol.jarit.business.entities.Member;
import dev.louiiuol.jarit.business.repositories.MemberRepository;
import dev.louiiuol.jarit.services.utils.AbstractService;

/**
 * Concrete implementation of {@code MemberService}
 * that extends {@code AbstractService} to handle {@code Member}
 * 
 * @see MemberService
 * @see AbstractService
 * @see Service
 */
@Service
public class MemberServiceImpl extends AbstractService<Member, MemberRepository>
    implements MemberService {

    protected MemberServiceImpl(MemberRepository repo) {
        super(repo);
    }

    @Override
    public Set<MemberDetailsDto> getAllByJar(Long id) {
        Set<Member> members = repo().findAllByJarId(id);
        return mapSetView(members, MemberDetailsDto.class);
    }

    @Override
    public boolean isJarAdmin(Long jarId, Long userId) {
        Member entity = getOne(jarId, userId);
        return entity != null ? entity.isAdmin() : false;
    }

    @Override
    public boolean isJarMember(Long jarId, Long userId) {
        Member entity = getOne(jarId, userId);
        return entity != null;
    }

    private Member getOne(Long jarId, Long userId) {
        return repo().findByJarIdAndUserId(jarId, userId)
            .orElseThrow(ResourceNotFoundException::new);
    }

}