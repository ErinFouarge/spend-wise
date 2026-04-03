import {
  Component, inject, DestroyRef, OnInit,
  signal, computed, ChangeDetectionStrategy
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIcon } from '@angular/material/icon';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { TransactionService } from '@/core/api/services/transaction.service';
import { Transaction, TransactionGroup } from '@/features/transactions/models/transaction.model';
import { CategoryService } from '@/core/api/services/category.service';
import { Category } from '@/shared/models/category.model';
import { DeleteComponent } from '@/features/transactions/components/delete/delete.component';
import { DialogFormService } from './services/dialog-form.service';
import { CategoryFormService } from './services/category-form.service';
import { DeleteConfirmService } from './services/delete-confirm.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIcon, DecimalPipe, DatePipe, MatButton, MatIconButton, DeleteComponent]
})
export class TransactionsComponent implements OnInit {
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  readonly dialogFormService = inject(DialogFormService);
  readonly categoryFormService = inject(CategoryFormService);
  readonly deleteConfirmService = inject(DeleteConfirmService);

  readonly income = signal<Transaction[]>([]);
  readonly expenses = signal<Transaction[]>([]);
  readonly loading = signal(true);

  readonly totalIncome = computed(() =>
    this.income().reduce((sum, t) => sum + t.amount, 0)
  );
  readonly totalExpenses = computed(() =>
    this.expenses().reduce((sum, t) => sum + t.amount, 0)
  );
  readonly balance = computed(() =>
    this.totalIncome() - this.totalExpenses()
  );
  readonly groupedTransactions = computed<TransactionGroup[]>(() => {
    const groups = new Map<string, Transaction[]>();
    const sorted = [...this.income(), ...this.expenses()]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const t of sorted) {
      const key = t.date.substring(0, 10);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(t);
    }
    return Array.from(groups.entries()).map(([date, transactions]) => ({ date, transactions }));
  });


  ngOnInit() {
    forkJoin({
      income: this.transactionService.getIncome(),
      expenses: this.transactionService.getExpenses(),
      categories: this.categoryService.getAll(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ income, expenses, categories }) => {
          this.income.set(income);
          this.expenses.set(expenses);
          this.categoryFormService.setCategories(categories);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
        }
      });
  }


  saveTransaction() {
    const form = this.dialogFormService.dialogForm();
    const editing = this.dialogFormService.editingTransaction();
    const { type, ...data } = form;

    if (editing) {
      this.transactionService.update(editing, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            const saved: Transaction = { ...editing, ...data, type };
            const update = (list: Transaction[]) =>
              list.map(t => t.id === editing.id ? saved : t);
            type === 'INCOME'
              ? this.income.update(update)
              : this.expenses.update(update);
            this.dialogFormService.closeDialog();
          },
          error: (err) => console.error('Update error', err),
        });
    } else {
      this.transactionService.create(type, data)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => this.reloadAll(),
          error: (err) => console.error('Create error', err),
        });
    }
  }

  private reloadAll() {
    this.transactionService.getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ income, expenses }) => {
          this.income.set(income);
          this.expenses.set(expenses);
          this.dialogFormService.closeDialog();
        },
        error: (err) => console.error('Reload error', err),
      });
  }

  executeDelete() {
    const transaction = this.deleteConfirmService.transactionToDelete();
    if (!transaction) return;

    this.deleteConfirmService.showDeleteConfirm.set(false);
    this.deleteConfirmService.setDeleting(transaction.id);

    this.transactionService.delete(transaction)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          const remove = (list: Transaction[]) =>
            list.filter(t => t.id !== transaction.id);
          transaction.type === 'INCOME'
            ? this.income.update(remove)
            : this.expenses.update(remove);
          this.deleteConfirmService.resetDelete();
        },
        error: () => {
          this.deleteConfirmService.setDeleting(null);
        }
      });
  }

  openAddDialog() {
    this.dialogFormService.openAddDialog();
  }

  openEditDialog(transaction: Transaction) {
    this.dialogFormService.openEditDialog(transaction);
  }

  closeDialog() {
    this.dialogFormService.closeDialog();
  }

  setDialogType(type: 'INCOME' | 'EXPENSE') {
    this.dialogFormService.setDialogType(type);
  }

  updateDialogField(field: string, value: string) {
    this.dialogFormService.updateDialogField(field as any, value);
  }

  confirmDelete(transaction: Transaction) {
    this.deleteConfirmService.confirmDelete(transaction);
  }

  addCategory() {
    this.categoryFormService.addCategory((cat) => {
      this.dialogFormService.dialogForm.update(f => ({
        ...f,
        categoryName: cat.name,
        categoryColor: cat.color,
      }));
    });
  }

  selectCategory(cat: Category) {
    this.categoryFormService.selectCategory(cat, (c) => {
      this.dialogFormService.dialogForm.update(f => ({
        ...f,
        categoryName: c.name,
        categoryColor: c.color,
      }));
    });
  }

  get showDialog() {
    return this.dialogFormService.showDialog;
  }

  get editingTransaction() {
    return this.dialogFormService.editingTransaction;
  }

  get cancelDelete() {
    return this.deleteConfirmService.cancelDelete;
  }

  get dialogForm() {
    return this.dialogFormService.dialogForm;
  }

  get showDeleteConfirm() {
    return this.deleteConfirmService.showDeleteConfirm;
  }

  get transactionToDelete() {
    return this.deleteConfirmService.transactionToDelete;
  }

  get deletingId() {
    return this.deleteConfirmService.deletingId;
  }

  get categories() {
    return this.categoryFormService.categories;
  }

  get showNewCategory() {
    return this.categoryFormService.showNewCategory;
  }

  get newCategoryName() {
    return this.categoryFormService.newCategoryName;
  }

  get newCategoryColor() {
    return this.categoryFormService.newCategoryColor;
  }
}
