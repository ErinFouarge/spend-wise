import { Injectable, signal } from '@angular/core';
import { DialogForm, Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class DialogFormService {
  readonly showDialog = signal(false);
  readonly editingTransaction = signal<Transaction | null>(null);
  readonly dialogForm = signal<DialogForm>(this.emptyForm());

  openAddDialog() {
    this.editingTransaction.set(null);
    this.dialogForm.set(this.emptyForm());
    this.showDialog.set(true);
  }

  openEditDialog(transaction: Transaction) {
    this.editingTransaction.set(transaction);
    this.dialogForm.set({
      type: transaction.type,
      amount: transaction.amount,
      description: transaction.description ?? '',
      categoryName: transaction.categoryName ?? '',
      categoryColor: transaction.categoryColor ?? '',
      date: transaction.date.substring(0, 10),
    });
    this.showDialog.set(true);
  }

  closeDialog() {
    this.showDialog.set(false);
    this.editingTransaction.set(null);
  }

  setDialogType(type: 'INCOME' | 'EXPENSE') {
    this.dialogForm.update(f => ({ ...f, type }));
  }

  updateDialogField(field: keyof DialogForm, value: string) {
    this.dialogForm.update(f => ({
      ...f,
      [field]: field === 'amount' ? Number.parseFloat(value) || 0 : value,
    }));
  }

  private emptyForm(): DialogForm {
    return {
      type: 'EXPENSE',
      amount: 0,
      description: '',
      categoryName: '',
      categoryColor: '#0f2027',
      date: new Date().toISOString().substring(0, 10),
    };
  }
}
