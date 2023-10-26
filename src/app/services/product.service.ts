import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../shared/models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl= "http://localhost:8080";
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/allProduct`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/addProduct`,product);
  }
  
  public deleteProduct(productId:Number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteProduct/${productId}`);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/updateProduct`,product);
  }
}
