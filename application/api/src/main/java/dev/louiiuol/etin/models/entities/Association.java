package dev.louiiuol.etin.models.entities;

import java.text.MessageFormat;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/** 
 * Describes an {@code Association}:
 * {@code Tinee}'s collects receivers
 * 
 * @see AbstractEntity
 * @see Entity
 * @see Table
 */
@Entity
@Table(name = "associations",
uniqueConstraints = {
    @UniqueConstraint(columnNames = "name", name = "association_name_UNIQUE"),
    @UniqueConstraint( columnNames = "code", name = "association_code_UNIQUE"),
})
public class Association extends AbstractEntity {

    private static final long serialVersionUID = 6670582233712532279L;

    protected Association() {
        // Overrides default no-args constructor as protected
    }

    @Column(columnDefinition = "VARCHAR(50)", nullable = false)
    private String name;

    @Column(columnDefinition = "CHAR(5)", nullable = false)
    private String code;

    @Column(length = 255)
    private String description;

    @Column(nullable = false)
    private String link;

    @Override
    public int hashCode() {
        return code.hashCode();
    }

    @Override
	public boolean equals(Object other) {
        if (other instanceof Association) {
            return code.equals(((Association) other).code);
        }
        return false;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ id#{0}, name: {1}, code: {2}, description: {3}, link: {4} }",
            getId(), name, code, description, link );
    }

}