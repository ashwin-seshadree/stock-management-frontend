import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs/config';
import { apiConstants } from '../common/api.constents';

interface paginationParams {
  page: number;
  limit: number;
}

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

  public getInventory(data: paginationParams) {
    const url = `${this.apiUrl}?page=${data.page}&limit=${data.limit}`;
    return this.http.get(url);
  }
}
