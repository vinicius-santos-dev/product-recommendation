import {Injectable} from '@angular/core';
import {CartState, CartStore} from "./cart.store";
import {RecommendationService} from "../../services/recommendation/recommendation.service";
import {Observable, of, switchMap, tap} from "rxjs";
import {Product} from "../../models";
import {CartQuery} from "./cart.query";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private cartStore: CartStore, private cartQuery: CartQuery) {
  }

  public addProduct(product: Product): void {
    this.cartStore.update((state: CartState) => {
      const products = {...state.products} || {};
      const productParams = products[product.slug] || {quantity: 0};

      console.log(productParams);

      products[product.slug] = {
        ...product,
        quantity: productParams.quantity + 1
      };

      return {
        ...state,
        products
      };
    });
  }

  public removeProduct(product: Product): void {
    this.cartStore.update((state: CartState) => {
      const products = {...state.products} || {};
      const productParams = products[product.slug] || {quantity: 0};

      if (productParams.quantity > 0) {
        products[product.slug] = {
          ...product,
          quantity: productParams.quantity - 1
        };
      }

      if (productParams.quantity === 1) {
        delete products[product.slug];
      }

      return {
        ...state,
        products
      };
    });
  }
}
