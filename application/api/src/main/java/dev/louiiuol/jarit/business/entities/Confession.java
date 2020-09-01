package dev.louiiuol.jarit.business.entities;

import java.text.MessageFormat;
import java.time.LocalDateTime;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.transaction.Transactional;


/**
 * Describes a {@code Confession} concrete Entity:
 * {@code Member}'s swear holder
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 * @see Transactional
 */
@Entity
@Table(name="confessions")
public class Confession extends AbstractEntity {

    private static final long serialVersionUID = -8560959912330250597L;

    @Column(length = 20, nullable = false)
    private String swear;

    @ManyToOne(cascade = CascadeType.REFRESH)
    @JoinColumn(nullable = false)
    private Member author;

    @Column(nullable = false, updatable = false)
    private LocalDateTime date = LocalDateTime.now();

    protected Confession() {
        // Overrides default no-args constructor as protected
    }

    public Member getAuthor() {
        return author;
    }
    @Override
    public int hashCode() {
        return getId().hashCode();
    }

    @Override
	public boolean equals(Object other) {
        if (other instanceof Confession) {
            return getId().equals( ((Confession) other).getId() );
        }
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, swear: {1}, author: {2}, date: {3} }",
        getId(), swear, author.getId(), date);
    }

}