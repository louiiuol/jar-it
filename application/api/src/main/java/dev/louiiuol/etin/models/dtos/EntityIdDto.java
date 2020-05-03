package dev.louiiuol.etin.models.dtos;

import java.io.Serializable;
import java.text.MessageFormat;

/**
 * DTO representing the {@code id}
 * of another DTO
 */
public class EntityIdDto implements Serializable {

    private static final long serialVersionUID = -2651333217353842740L;

    protected EntityIdDto() {
        // Overrides default no-args constructor as protected
    }

    /**
     * Creates new DTO based on given id
     * 
     * @param id identifier of the dto to represent
     * @return new instance of {@code EntityIdDto}
     */
    public EntityIdDto(Long id) {
        this.id = id;
    }

    private Long id;

    public Long getId() { return id; }

    @Override
    public int hashCode() { return id.hashCode(); }

    @Override
	public boolean equals(Object obj) {
        if (obj instanceof EntityIdDto)
            return id.equals(( (EntityIdDto) obj ).id);
		return false;
    }

    @Override
    public String toString() { return MessageFormat.format("[ id: {0} ] ", id); }

}