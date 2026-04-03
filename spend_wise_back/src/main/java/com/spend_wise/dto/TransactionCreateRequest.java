package com.spend_wise.dto;

import lombok.Getter;

import java.math.BigDecimal;

public class TransactionCreateRequest {
    @Getter
    private BigDecimal amount;

    @Getter
    private String description;

    @Getter
    private String date;

    @Getter
    private String categoryName;

    @Getter
    private String categoryColor;

}
