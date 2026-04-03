package com.spend_wise.services;

import com.spend_wise.domain.TransactionType;
import com.spend_wise.repositories.TransactionRepository;
import org.springframework.stereotype.Service;

@Service
public class IncomeService extends TransactionService {

    public IncomeService(TransactionRepository transactionRepository, UserService userService, CategoryService categoryService) {
        super(transactionRepository, userService, categoryService, TransactionType.INCOME);
    }
}
