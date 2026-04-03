package com.spend_wise.repositories;

import com.spend_wise.domain.Transaction;
import com.spend_wise.domain.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findByType(TransactionType type);
}
