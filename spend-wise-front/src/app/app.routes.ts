import { Routes } from '@angular/router';
import {authGuard} from './core/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/dashboard/dashboard')
        .then(m => m.Dashboard),
    canActivate: [authGuard]
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./features/expenses/expenses')
        .then(m => m.Expenses),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./features/profile/profile')
        .then(m => m.Profile),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login')
        .then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register')
        .then(m => m.Register)
  },
];
