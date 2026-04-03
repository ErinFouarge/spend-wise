package com.spend_wise.mapper;

import com.spend_wise.domain.Transaction;
import com.spend_wise.dto.TransactionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TransactionMapper {

    @Mapping(source = "category.name", target = "categoryName")
    @Mapping(source = "category.color", target = "categoryColor")
    TransactionResponse toResponse(Transaction transaction);
}
