import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private excludedEndpoints = [/login/gi, /forgot-password/gi, /register/gi];

  constructor(private sessionService: SessionService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isExcluded = this.excludedEndpoints.some(pattern => pattern.test(request.url));

    if (isExcluded) {
      return next.handle(request);
    }

    const authToken = this.sessionService.getAuthToken();

    if (authToken) {
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`),
      });
      return next.handle(authRequest);
    }

    return next.handle(request);
  }
}