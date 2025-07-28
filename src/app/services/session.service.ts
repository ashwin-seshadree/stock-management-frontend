import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor() { }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  startSession(sessionData: { token: string }) {
    if (this.isBrowser()) {
      localStorage.setItem('x-access-token', sessionData['token']);
    }
  }

  getAuthToken(): string | null {
    if (this.isBrowser()) {
      const token = localStorage.getItem('x-access-token');
      console.log('SessionService: getAuthToken', { token });
      return token ? token : null;
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }
}
