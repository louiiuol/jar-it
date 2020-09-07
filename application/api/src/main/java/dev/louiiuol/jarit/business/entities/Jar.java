package dev.louiiuol.jarit.business.entities;

import java.text.MessageFormat;
import java.time.LocalDate; 
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Describes a {@code Jar} concrete Entity:
 * <i>Store members swears, sum balances, and pay Association</i>
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 */
@Entity
@Table(name="jars")
public class Jar extends AbstractEntity {

    private static final long serialVersionUID = 1336305530679958140L;

    @Column(length = 20, nullable = false)
    private String title;

    @Column(length = 250)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private User author;

    @Column(nullable = false, updatable = false)
    private LocalDate startingDate;

    @Column(nullable = false)
    private LocalDate closingDate;

    @Enumerated(EnumType.ORDINAL)
    private JarState state;

    @Column(nullable = false)
    private Double referenceCost;

    @Column(nullable = false)
    private Double maxAmount;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(nullable = false)
    private Association addressee;

    @OneToMany(fetch = FetchType.EAGER, mappedBy="jar", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Member> members;

    protected Jar() {
        // Overrides default no-args constructor as protected
    }

    public Double getReferenceCost() {
        return referenceCost;
    }

    public Double getMaxAmount() {
        return maxAmount;
    }

    public JarState getState() {
        return state;
    }

	public void setState(JarState state) {
        this.state = state;
    }

    public LocalDate getClosingDate() {
        return closingDate;
    }

    public List<Member> getMembers() {
        return members;
    }

    public User getAuthor() {
        return author;
    }

    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
	public boolean equals(Object obj) {
        if (obj instanceof Jar) {
            return getId().equals( ((Jar) obj).getId() );
        }
		return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format(
                "{ id: {0}, title: {1}, description: {2}, author: {3}, state: {5}, goal: {9}, starting_date: {4}, closing_date: {8}, reference_cost: {6}, max_amount: {7} } ",
                getId(), title, description, author.getId(), startingDate, state, referenceCost, maxAmount, closingDate, addressee.getId());
    }

}