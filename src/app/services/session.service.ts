import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    public router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  startSession(sessionData: { token: string }) {
    if (this.isBrowser()) {
      localStorage.setItem('x-access-token', sessionData.token);
    }
  }

  getAuthToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('x-access-token') ?? null;
    }
    return null;
  }

  endSession(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('x-access-token');
    }
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getAuthToken();
  }
}
