package dev.louiiuol.jarit.services.jars.members;

import java.util.Set;

import dev.louiiuol.jarit.business.dtos.jars.members.MemberDetailsDto;
import dev.louiiuol.jarit.business.entities.Member;

/** 
 * Interface to deal with {@code Member} informations:
 * <p>
 * <b> This Service is meant to be use only by JarService & Validators </b>
 * 
 * @see MemberViewDetailsDto
 * @see MemberPreviewDto
 * @see Member
 */
public interface MemberService {

    /**
     * Returns all {@code Jar}'s members detailed gith given jarId
     * 
     * @param jarId jar's identifier
     * @return {@code Set<MemberViewDetailsDto>} detailed member list
     */
    public Set<MemberDetailsDto> getAllByJar(Long jarId);

    public boolean isJarAdmin(Long jarId, Long userId);

    public boolean isJarMember(Long jarId, Long userId);

}