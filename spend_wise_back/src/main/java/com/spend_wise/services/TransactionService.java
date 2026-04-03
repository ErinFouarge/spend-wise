package com.spend_wise.services;

import com.spend_wise.domain.*;
import com.spend_wise.dto.TransactionCreateRequest;
import com.spend_wise.repositories.TransactionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public abstract class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final CategoryService categoryService;
    private final TransactionType type;

    public TransactionService(
            TransactionRepository transactionRepository,
            UserService userService,
            CategoryService categoryService, TransactionType type) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.categoryService = categoryService;
        this.type = type;
    }

    public List<Transaction> getByType(String userId) {
        return transactionRepository.findByType(type)
                .stream()
                .filter(transaction -> transaction.getUser().getId().toString().equals(userId))
                .toList();
    }

    public void create(TransactionCreateRequest request, String userId) {
        User user = userService.getById(userId);
        Category category = categoryService.getByNameAndUser(request.getCategoryName(), request.getCategoryColor(), user);

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .description(request.getDescription())
                .date(LocalDate.parse(request.getDate()))
                .type(type)
                .category(category)
                .user(user)
                .build();

        transactionRepository.save(transaction);
    }

    public void delete(UUID id, String userId) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().toString().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        transactionRepository.delete(transaction);
    }

    public void update(UUID id, TransactionCreateRequest request, String userId) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        if (!transaction.getUser().getId().toString().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        Category category = categoryService.getByNameAndUser(request.getCategoryName(), request.getCategoryColor(), transaction.getUser());

        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setDate(LocalDate.parse(request.getDate()));
        transaction.setCategory(category);

        transactionRepository.save(transaction);
    }

}
