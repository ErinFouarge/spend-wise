package com.spend_wise.mapper;

import com.spend_wise.domain.Category;
import com.spend_wise.dto.CategoryResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryResponse toResponse(Category category);
}
