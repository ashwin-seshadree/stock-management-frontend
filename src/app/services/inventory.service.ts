import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs/config';
import { apiConstants } from '../common/api.constents';
import path from 'path';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl: string;
  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = config.apiUrl + "/" + apiConstants.inventory
  }

  public getInventory() {
    const url = `${this.apiUrl}`;
    return this.http.get(url);
  }
}
