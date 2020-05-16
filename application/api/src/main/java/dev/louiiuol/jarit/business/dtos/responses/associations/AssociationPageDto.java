package dev.louiiuol.jarit.business.dtos.responses.associations;

import java.text.MessageFormat;
import java.util.List;

/**
 * DTO representing the {@code UserPageDto}
 * to display a {@code List} of AssociationViewDto
 * <p>
 * Since the {@code List} items are returned from a
 * {@code Pageable}, the {@code totalCount} is returned
 * for more advanced Pagination research.
 * 
 * @see AssociationViewDto
 */
public class AssociationPageDto {

    private long totalCount;

    private List<AssociationViewDto> items;

    public AssociationPageDto(long totalCount, List<AssociationViewDto> items) {
        this.totalCount = totalCount;
        this.items = items;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{ totalCount: {0}, items: {1} }",
            totalCount, items);
    }
}