import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../../environment';
import {Category} from '@/shared/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getAll() {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
