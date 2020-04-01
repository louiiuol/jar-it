package dev.louiiuol.etin.models.entities;

import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

/**
 * Custom {@code UserDetails} for Spring authentication
 * contract and custom properties we want to add
 * in the token (such as the id or avatar). </p>
 * 
 * @see User
 * @see GrantedAuthority
 * */
public class UserDetails extends User {

    private static final long serialVersionUID = 5803283930339051994L;

    /**
     * Construct new {@code UserDetails} instance with custom {@code User}'s
     *  informations to generate logged user's token
     * 
     * @param user actual user's informations
     * @return {@code UserDetails}
     */
    public UserDetails(dev.louiiuol.etin.models.entities.User user) {
      super( user.getUsername(), user.getPassword(), buildAuthorities(user.getRoles()) );
      id = user.getId();
      avatar = user.getAvatar();
    }

    private Long id;

    private String avatar;

    public final static String USER_ID_KEY = "userId";

    public Long getId() { return id; }
    public String getAvatar() { return avatar; }

    /**
     * Create {@code Map} of {@code UserDetails} custom informations
     * for the CustomTokenEnhancer
     * 
     * @return {@code Map<String, Object>} Custom Token
     */
    public Map<String, Object> init() {
      Map<String, Object> additionalInfo = new HashMap<>();
      additionalInfo.put(USER_ID_KEY, id);
      additionalInfo.put("username", getUsername());
      additionalInfo.put("role", getAuthorities());
      additionalInfo.put("avatar", getAvatar());
      return additionalInfo;
    }

    /**
     * Build {@code Set<GrantedAuthorithy>} depending on given {@Set<Role>}
     * 
     * @param roles Set of roles defining permissions
     * @return {@code Set<GrantedAuthority>}
     */
    private static Set<GrantedAuthority> buildAuthorities(Set<Role> roles) {
      return roles.stream().map(role -> new SimpleGrantedAuthority(role.getCode()) )
        .collect(Collectors.toUnmodifiableSet());
    }

    @Override
    public String toString() {
      return MessageFormat.format("[ id: {0}, authorities: {1}, password: [PROTECTED], username: {2}, enabled: {3}, expired: {4}, locked: {5}, credentials-expired: {6} ]",
        id, getAuthorities(), getUsername(), isEnabled(), !isAccountNonExpired(), !isAccountNonLocked(), !isCredentialsNonExpired() );
    }

}
