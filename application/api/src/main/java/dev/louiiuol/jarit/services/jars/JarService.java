package dev.louiiuol.jarit.services.jars;

import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessDto;
import dev.louiiuol.jarit.business.dtos.jars.confessions.ConfessionViewDto;
import dev.louiiuol.jarit.business.dtos.jars.members.MemberUpdateDto;

import java.util.List;
import java.util.Set;

import dev.louiiuol.jarit.business.dtos.PageDto;
import dev.louiiuol.jarit.business.dtos.jars.JarCreateDto;
import dev.louiiuol.jarit.business.dtos.jars.JarDetailsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarUpdateSettingsDto;
import dev.louiiuol.jarit.business.dtos.jars.JarPreviewDto;

/**
 * Interface to deal with {@code Jar} informations.
 * <ul>
 *  <li> Long {@link #create(JarCreateDto input)}
 *  <li> Set<JarPreviewDto> {@link #getAll()}
 *  <li> JarPreviewDto {@link #get( Long id)}
 *  <li> JarPreviewDto {@link #update(Long id, JarUpdateDto dto)}
 * </ul>
 * Members:
 *  <ul>
 *  <li> JarMembersViewDto {@link #getMembers( Long id)}
 * <li> void {@link #addMember(Long jar, Long user )}
 * <li> void {@link #updateMemberBalance( Long user, Long jar, Double balance )}
 * <li> void {@link #removeMember(Long jar, Long user )}
 * </ul>
 * Confessions:
  * <ul>
 *  <li> ConfessionViewDto {@link #confess(Long jar, Long user, ConfessDto input)}
 *  <li> Set {@link #getJarConfessions(Long jarId)}
 * <li> void {@link #updateConfession(Long confessionId, ConfessDto dto)}
 * </ul>
 */
public interface JarService {

    /**
     * Create a new Jar based on {@code JarCreateDto}.
     * 
     * @param jarCreateDto {@code Jar}'s information
     * @return {@code Long} created {@code Jar}'s identifier
     */
    public Long create(JarCreateDto dto);

    /**
     * Returns Jar Preview matching the given id
     *  
     * @param jarId {@code Jar}'s identifier
     * @return {@code JarPreviewDto} preview of Jar
     */
    public JarPreviewDto getPreview(Long id);

    /**
     * Returns Jar Details matching the given id
     *  
     * @param jarId {@code Jar}'s identifier
     * @return {@code JarDetailsDto} detailed view of Jar
     */
    public JarDetailsDto getDetails(Long jarId);

    /**
     * Returns all user's jars
     *  
     * @param id User's identifier
     * @return {@code PageDto<JarPreviewDto>} list of User's Jars
     */
    public PageDto<JarPreviewDto> getAllByUser(Long id, int page, int size, String order, String sort);

    /**
     * Update specified Jar's settings based on given {@code JarUpdateDto}.
     * 
     * @param id {@code Jar}'s identifier
     * @param dto {@code Jar}'s informations to update
     */
    public void updateSettings(Long id, JarUpdateSettingsDto dto);

    /**
     * Update specified Jar's members based on given {@code JarUpdateDto}.
     * 
     * @param id {@code Jar}'s identifier
     * @param dto {@code Jar}'s informations to update
     */
    public void updateMembers(Long id, List<MemberUpdateDto> dto);

    /**
     * Activate specified Jar based on given {@code id}.
     * 
     * @param id {@code Jar}'s identifier
     */
    public void activate(Long id);

    /**
     * Adds new swear into specified Jar with given author and reporter members
     *  
     * @param jarId Jar's identifier
     * @param dto Report's informations
     */
    public void confess(Long jarId, ConfessDto dto);

    /**
     * Returns all jars in database (used by admin)
     * @return {@code PageDto<JarPreviewDto>} All Jars from database
     */
    public PageDto<JarPreviewDto> getAll(int page, int size, String order, String sort);

    /**
     * Returns all confessions of specific jar
     * @return {@code Set<ConfessionViewDto>} All confessions of specific jar
     */
    public Set<ConfessionViewDto> getJarConfessions(Long jarId);

    /**
     * Update specific confession
     */
    public void updateConfession(Long confessionId, ConfessDto dto);

}
