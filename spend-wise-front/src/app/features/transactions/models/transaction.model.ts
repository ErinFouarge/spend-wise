export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  categoryName: string;
  categoryColor: string;
  type: 'INCOME' | 'EXPENSE';
}

export interface TransactionGroup {
  date: string;
  transactions: Transaction[];
}

export interface DialogForm {
  type: 'INCOME' | 'EXPENSE';
  amount: number;
  description: string;
  categoryName: string;
  categoryColor: string;
  date: string;
}
