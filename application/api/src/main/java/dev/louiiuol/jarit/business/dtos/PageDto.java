package dev.louiiuol.jarit.business.dtos;

import java.text.MessageFormat;
import java.util.Collection;

public class PageDto<T> {

    private long totalCount;

    private Collection<T> items;

    public PageDto(long totalCount, Collection<T> items) {
        this.totalCount = totalCount;
        this.items = items;
    }

    @Override
    public String toString() {
        return MessageFormat.format("{total: {0}, items: {1}}", totalCount, items);
    }

}