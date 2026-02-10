import { Injectable, signal, computed } from '@angular/core';

export interface UserSession {
  token: string;
  firstName: string;
  lastName: string;
}

@Injectable({ providedIn: 'root' })
export class SessionService {

  private readonly STORAGE_KEY = 'spendwise_session';

  private readonly _session = signal<UserSession | null>(this.loadFromStorage());

  session = this._session.asReadonly();

  isLoggedIn = computed(() => !!this._session());

  setSession(session: UserSession) {
    this._session.set(session);
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(session));
  }

  clearSession() {
    this._session.set(null);
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  private loadFromStorage(): UserSession | null {
    const raw = sessionStorage.getItem(this.STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}

