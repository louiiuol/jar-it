package dev.louiiuol.etin.models.entities;

import java.io.Serializable;
import java.text.MessageFormat;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Provides <i>primary key</i> to each {@code Entity} that extends it.
 * 
 * @see MappedSuperclass
 * @see Serializable
 * @see GeneratedValue
 */
@MappedSuperclass
public abstract class AbstractEntity implements Serializable {

    private static final long serialVersionUID = 4461731511372760807L;

    protected AbstractEntity() {
        // Overrides default no-args constructor as protected
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "BIGINT(20) UNSIGNED")
    private Long id;

    public Long getId() {
        return id;
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    @Override
	public boolean equals(Object other) {
        if (other instanceof AbstractEntity)
            return id.equals(( (AbstractEntity) other ).id);
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{0}", id);
    }

}