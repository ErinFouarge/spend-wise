package com.spend_wise.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.UUID;

@Data
public class TransactionResponse {
    private UUID id;
    private String description;
    private BigDecimal amount;
    private String date;
    private String categoryName;
    private String categoryColor;
}
