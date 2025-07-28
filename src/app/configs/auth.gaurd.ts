import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = (route, state) => {
    const sessionService = inject(SessionService);
    const router = inject(Router);

    if (sessionService.isLoggedIn()) {
        return true;
    } else {
        console.warn('Access denied - User not logged in');
        router.navigate(['/login']);
        return false;
    }
};
