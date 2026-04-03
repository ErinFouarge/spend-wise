import { Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class DeleteConfirmService {
  readonly showDeleteConfirm = signal(false);
  readonly transactionToDelete = signal<Transaction | null>(null);
  readonly deletingId = signal<string | null>(null);

  confirmDelete(transaction: Transaction) {
    this.transactionToDelete.set(transaction);
    this.showDeleteConfirm.set(true);
  }

  cancelDelete() {
    this.showDeleteConfirm.set(false);
    this.transactionToDelete.set(null);
  }

  setDeleting(id: string | null) {
    this.deletingId.set(id);
  }

  resetDelete() {
    this.showDeleteConfirm.set(false);
    this.transactionToDelete.set(null);
    this.deletingId.set(null);
  }
}
