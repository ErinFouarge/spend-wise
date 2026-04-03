package com.spend_wise.controllers;

import com.spend_wise.domain.TransactionType;
import com.spend_wise.mapper.TransactionMapper;
import com.spend_wise.services.ExpenseService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/expenses")
public class ExpenseController extends TransactionController {

    public ExpenseController(ExpenseService expenseService, TransactionMapper transactionMapper) {
        super(expenseService, TransactionType.EXPENSE, transactionMapper);
    }
}
