import {Injectable} from '@angular/core';
import {ProductsStore} from "./products.store";
import {RecommendationService} from "../../services/recommendation/recommendation.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {Product} from "../../models";
import {ProductsQuery} from "./products.query";
import {LocalStorageService} from "../../services/storage/localstorage.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(
    private productsStore: ProductsStore,
    private productsQuery: ProductsQuery,
    private recommendationService: RecommendationService,
    private localStorageService: LocalStorageService) {
  }

  public getGeneralRecommendations(): Observable<Product[]> {
    return this.recommendationService.getGeneralRecommendations().pipe(
      tap((products: Product[]) => {
        this.productsStore.set(products);
      })
    );
  }

  public getRecommendationByUser(documentNumber: string): Observable<Product[]> {
    return this.recommendationService.getRecommendationByUser(documentNumber).pipe(
      tap((products: Product[]) => {
        this.productsStore.set(products);
      })
    );
  }

  public loadRecommendations(): Observable<Product[]> {
    const products$ = this.productsQuery.selectAll();

    return products$.pipe(
      switchMap((products: Product[]) => {
        if (products && products.length > 0) {
          return of(products);
        }

        const documentNumber = this.localStorageService.get('documentNumber');

        return documentNumber ? this.getRecommendationByUser(documentNumber) : this.getGeneralRecommendations();
      })
    );
  }
}
