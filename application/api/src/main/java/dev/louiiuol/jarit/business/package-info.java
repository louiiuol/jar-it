/**
 * This package contains JPA-mapped business entities.
 * <p>
 * Entities are mapped by field-access strategy, provide default no-arg
 * protected constructor, an identifier of type {@link Long} and an optimistic
 * lock value of type {@link java.time.LocalDateTime}. Entities with immutable
 * fields provide a constructor in order to set related attributes at
 * construction time.
 * <p>
 * Last but not least, entities override {@code Object#equals(Object)},
 * {@code Object#hashCode()} and {@code Object#toString()}.
 * 
 * @see dev.louiiuol.jarit.business.entities.AbstractEntity
 */
package dev.louiiuol.jarit.business;