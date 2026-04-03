import { Injectable, signal } from '@angular/core';
import { Category } from '@/shared/models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryFormService {
  readonly categories = signal<Category[]>([]);
  readonly showNewCategory = signal(false);
  readonly newCategoryName = signal('');
  readonly newCategoryColor = signal('#0f2027');

  setCategories(categories: Category[]) {
    this.categories.set(categories);
  }

  addCategory(onCategoryAdded: (category: Category) => void) {
    const name = this.newCategoryName().trim();
    const color = this.newCategoryColor();
    if (!name) return;

    const newCat: Category = { id: crypto.randomUUID(), name, color };
    this.categories.update(list => [...list, newCat]);

    onCategoryAdded(newCat);

    this.newCategoryName.set('');
    this.showNewCategory.set(false);
  }

  selectCategory(cat: Category, onCategorySelected: (category: Category) => void) {
    onCategorySelected(cat);
  }
}
