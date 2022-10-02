import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Product} from "../../models";

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.backendUrl}/recommendation`;
  }

  public getGeneralRecommendations(): Observable<Product[]> {
    return this.http.post(`${this.baseUrl}/general`, {}) as Observable<Product[]>;
  }

  public getRecommendationByUser(documentNumber: string): Observable<Product[]> {
    return this.http.post(`${this.baseUrl}/byUser/${documentNumber}`, {}) as Observable<Product[]>;
  }

  public recommendProductsByCategory(
    category: string,
    userId: string
  ): Observable<Product[]> {
    return this.http.get(`${this.baseUrl}/${userId}/${category}`) as Observable<Product[]>;
  }
}
