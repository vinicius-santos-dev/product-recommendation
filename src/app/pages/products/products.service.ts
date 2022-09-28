import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  productsByCategory,
  productsWithoutUser,
  productsWithUser,
} from './products-without-user';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.backendUrl;
  }

  // public recommendProductsWithoutUser(): Observable<any> {
  //   return of(productsWithoutUser);
  // }

  public recommendProductsWithoutUser(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // public recommendProductsWithUser(userId: string): Observable<any> {
  //   return of (productsWithUser);
  // }

  public recommendProductsWithUser(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  // public recommendProductsByCategory(
  //   category: string,
  //   userId: string
  // ): Observable<any> {
  //   return of(productsByCategory);
  // }

  public recommendProductsByCategory(
    category: string,
    userId: string
  ): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}/${category}`);
  }
}
