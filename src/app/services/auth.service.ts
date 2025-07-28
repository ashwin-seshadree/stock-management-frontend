import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs/config';
import { apiConstants } from '../common/api.constents';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = config.apiUrl;
  }

  public login(data: any) {
    const url = `${this.apiUrl}${apiConstants.login}`;
    return this.http.post(url, data);
  }
}
