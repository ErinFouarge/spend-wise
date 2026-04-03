package com.spend_wise.controllers;

import com.spend_wise.domain.TransactionType;
import com.spend_wise.dto.TransactionCreateRequest;
import com.spend_wise.dto.TransactionResponse;
import com.spend_wise.mapper.TransactionMapper;
import com.spend_wise.services.TransactionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.UUID;

@Validated
public abstract class TransactionController {

    protected final TransactionService transactionService;
    protected final TransactionType type;
    protected final TransactionMapper transactionMapper;

    protected TransactionController(TransactionService transactionService, TransactionType type, TransactionMapper transactionMapper) {
        this.transactionMapper = transactionMapper;
        this.transactionService = transactionService;
        this.type = type;
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getByType(Principal principal) {
        return ResponseEntity.ok(
                transactionService.getByType(principal.getName())
                        .stream()
                        .map(transactionMapper::toResponse)
                        .toList()
        );
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody TransactionCreateRequest request, Principal principal) {
        transactionService.create(request, principal.getName());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody TransactionCreateRequest request, @RequestParam UUID id, Principal principal) {
        transactionService.update(id, request, principal.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> delete(@RequestParam UUID id, Principal principal) {
        transactionService.delete(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
