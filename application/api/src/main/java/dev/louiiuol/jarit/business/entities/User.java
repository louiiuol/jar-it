package dev.louiiuol.jarit.business.entities;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import dev.louiiuol.jarit.services.utils.BooleanConverter;

/**
 * Describes a {@code User} concrete Entity:
 * <p><i>actual users </i>(business) of the app, contains
 * basic information such as credentials, status, roles ..
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 */
@Entity
@Table(name="users",
  uniqueConstraints = {
      @UniqueConstraint( columnNames = "username", name = "user_username_UNIQUE"),
      @UniqueConstraint( columnNames = "email", name = "user_email_UNIQUE"),
  }
)
public class User extends AbstractEntity {

  private static final long serialVersionUID = -9139538865891144579L;

  @Column(columnDefinition = "VARCHAR(12)", nullable = false)
  private String username;

  @Column(columnDefinition = "VARCHAR(100)", nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String avatar;

  @Column(columnDefinition = "DATE", nullable = false, updatable = false)
  private LocalDate birthDate;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable( name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id") )
  private Set<Role> roles;

  @Column(columnDefinition = "ENUM('T', 'F') DEFAULT 'T'", nullable = false)
  @Convert(converter = BooleanConverter.class)
  private boolean enabled;

  @Column(columnDefinition = "ENUM('T', 'F') DEFAULT 'T'", nullable = false)
  @Convert(converter = BooleanConverter.class)
  private boolean accountNonExpired;

  @Column(columnDefinition = "ENUM('T', 'F') DEFAULT 'T'", nullable = false)
  @Convert(converter = BooleanConverter.class)
  private boolean accountNonLocked;

  @Column(columnDefinition = "ENUM('T', 'F') DEFAULT 'T'", nullable = false)
  @Convert(converter = BooleanConverter.class)
  private boolean credentialsNonExpired;

  protected User() {
    // Overrides default no-args constructor as protected
  }

  /**
   * Close user account: Spring Security will
   * no longer accepts user's credentials
   */
  public void close() {
    this.enabled = false;
  }

  /**
   *  Getter to retrieve user password
   * @return encrypted password as {@code String}
   */
  public String getPassword() {
    return password;
  }

  /** Following methods are used by Spring's UserDetails ONLY to customize tokens */
  protected String getUsername() {
    return username;
  }

  protected String getEmail() {
    return email;
  }

  protected boolean getAccountNonExpired() {
    return accountNonExpired;
  }

  protected boolean getAccountNonLocked() {
    return accountNonLocked;
  }

  protected boolean getCredentialsNonExpired() {
    return credentialsNonExpired;
  }

  protected boolean getEnabled() {
    return enabled;
  }

  protected String getAvatar() {
    return avatar;
  }

  protected Set<Role> getRoles() {
    return roles;
  }

  @Override
  public int hashCode() {
    return username.hashCode();
  }

    @Override
	public boolean equals(Object other) {
    if (other instanceof User) {
      return username.equals( ((User) other).username );
    }
		return false;
  }

    @Override
    public String toString() {
      return MessageFormat.format("{ id: {0}, username: {1}, email: {2}, birthDate: {3}, roles: {4}, enabled: {5} }",
        getId(), username, email, birthDate, roles, enabled);
    }

}