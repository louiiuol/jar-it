package dev.louiiuol.jarit.business.entities;

import java.text.MessageFormat;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import dev.louiiuol.jarit.services.utils.BooleanConverter;

/**
 * Describes a {@code Role} concrete Entity:
 * {@code User}'s <i> permissions<i> to
 * perform actions over API
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 */
@Entity
@Table(name="roles",
    uniqueConstraints = { @UniqueConstraint(name="roles_code_UNIQUE", columnNames = { "code"} )}
)
public class Role extends AbstractEntity {

    private static final long serialVersionUID = 1467670401616465661L;

    @Column(columnDefinition = "CHAR(10)", nullable = false)
    private String code;

    @Convert(converter = BooleanConverter.class)
    @Column(columnDefinition = "ENUM('T', 'F') DEFAULT 'T'", nullable = false)
    private boolean defaultRole = false;

    protected Role() {
        // Overrides default no-args constructor as protected
    }

    protected String getCode() {
        return code;
    }

    @Override
    public int hashCode() {
        return Objects.hash(code);
    }

    @Override
	public boolean equals(Object other) {
        if (other instanceof Role) {
            return code.equals( ((Role) other).code );
        }
		return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id: {0}, code: {1}, default: {2} }",
            getId(), code, defaultRole); 
    }

}
