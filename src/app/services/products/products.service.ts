import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL = environment.baseUrl;

  constructor(private http:HttpClient) { 

  }

  fetchProducts() {
    return this.http.get(this.baseURL+ "product");
  }
}
