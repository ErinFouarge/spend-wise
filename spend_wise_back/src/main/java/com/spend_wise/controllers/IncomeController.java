package com.spend_wise.controllers;

import com.spend_wise.domain.TransactionType;
import com.spend_wise.mapper.TransactionMapper;
import com.spend_wise.services.IncomeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/income")
public class IncomeController extends TransactionController {

    public IncomeController(IncomeService incomeServiceService, TransactionMapper transactionMapper) {
        super(incomeServiceService, TransactionType.INCOME, transactionMapper);
    }

}
