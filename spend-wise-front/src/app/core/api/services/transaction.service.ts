import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, map} from 'rxjs';
import { Transaction } from '@/features/transactions/models/transaction.model';
import {environment} from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getIncome() {
    return this.http.get<Transaction[]>(`${this.apiUrl}/income`).pipe(
      map(list => list.map(t => ({ ...t, type: 'INCOME' as const })))
    );
  }

  getExpenses() {
    return this.http.get<Transaction[]>(`${this.apiUrl}/expenses`).pipe(
      map(list => list.map(t => ({ ...t, type: 'EXPENSE' as const })))
    );
  }

  create(type: 'INCOME' | 'EXPENSE', data: Omit<Transaction, 'id' | 'type'>) {
    const endpoint = type === 'INCOME' ? 'income' : 'expenses';
    return this.http.post<void>(`${this.apiUrl}/${endpoint}`, data);
  }

  getAll() {
    return forkJoin({
      income:   this.getIncome(),
      expenses: this.getExpenses(),
    });
  }

  update(transaction: Transaction, data: Omit<Transaction, 'id' | 'type'>) {
    const endpoint = transaction.type === 'INCOME' ? 'income' : 'expenses';
    return this.http.put<void>(
      `${this.apiUrl}/${endpoint}`,
      data,
      { params: { id: transaction.id } }
    );
  }

  delete(transaction: Transaction) {
    const endpoint = transaction.type === 'INCOME' ? 'income' : 'expenses';
    return this.http.delete<void>(`${this.apiUrl}/${endpoint}`, {
      params: { id: transaction.id }
    });
  }
}
