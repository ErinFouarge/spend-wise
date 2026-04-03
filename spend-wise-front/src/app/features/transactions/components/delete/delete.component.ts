import {Component, input, output} from '@angular/core';
import { Transaction } from '@/features/transactions/models/transaction.model';
import { MatIcon } from '@angular/material/icon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [MatIcon, DecimalPipe],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css',
})
export class DeleteComponent {
  open = input<boolean>(false);
  transaction = input<Transaction | null>(null);

  cancelClicked = output<void>();
  confirmClicked = output<void>();
}
