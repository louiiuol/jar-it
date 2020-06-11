package dev.louiiuol.jarit.business.entities;

import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.transaction.Transactional;

import dev.louiiuol.jarit.services.utils.BooleanConverter;

/**
 * Describes a {@code Member} concrete Entity:
 * Represent an {@code User}'s informations in a specific {@code Tinee}
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 * @see Transactional
 */
@Entity
@Table(name="members")
public class Member extends AbstractEntity {

    private static final long serialVersionUID = 8372854599080961056L;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH)
    @JoinColumn(nullable = false)
    private Jar jar;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private User user;

    @Column(nullable = false)
    private Double balance;

    @Column(nullable = false, updatable = false)
    private LocalDateTime joined = LocalDateTime.now();

    @Convert(converter = BooleanConverter.class)
    @Column(length = 1, nullable = false)
    private Boolean admin;

    @Convert(converter = BooleanConverter.class)
    @Column(length = 1, nullable = false)
    private Boolean payed;

    @OneToMany(fetch= FetchType.EAGER, mappedBy = "author", cascade = CascadeType.ALL)
    private List<Confession> confessions;

    protected Member() {
        // Overrides default no-args constructor as protected
    }

	public String getUsername() {
        return user.getUsername();
    }

    public String getAvatar() {
        return user.getAvatar();
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double amount) {
        this.balance = amount;
    }

    public Boolean isAdmin() {
        return admin;
    }

    public User getUser() {
        return user;
    }

    public Jar getJar() {
        return jar;
    }

    public void setJar(Jar jar) {
        this.jar = jar;
    }

    @Override
    public int hashCode() {
        return Objects.hash(jar, user);
    }

    @Override
    public boolean equals(Object other) {
        if (other instanceof Member) {
            return jar.getId().equals(( (Member) other ).jar.getId()) 
                && user.getId().equals(( (Member) other ).user.getId());
        }
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, jar: {1}, user: {2}, balance: {3}, admin: {4}, join_date: {5}, payed: {6} }",
            getId(), jar, user, balance, admin, joined, payed);
    }

}
