import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs/config';
import { apiConstants } from '../common/api.constents';

interface paginationParams {
  page: number;
  limit: number;
}

interface ProductData {
  product_name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Product {
  private apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = config.apiUrl + "/" + apiConstants.product;
  }

  public product(data: ProductData, isUpdate: boolean = false, product_id?: number) {
    let url = `${this.apiUrl}`;
    if (isUpdate) {
      url = `${url}/${product_id}`;
      return this.http.put(url, data);
    }
    return this.http.post(url, data);
  }

  public getAllProducts(data: paginationParams) {
    const url = `${this.apiUrl}?page=${data.page}&limit=${data.limit}`;
    return this.http.get(url);
  }

  public deleteProduct(product_id: number) {
    const url = `${this.apiUrl}/${product_id}`;
    return this.http.delete(url);
  }
}
