import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {Product, ProductParams} from "../../models";


export interface CartState {
  products: Record<string, ProductParams>;
  similar: ProductParams[];
}

function createInitialState(): CartState {
  return {
    products: null,
    similar: []
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'cart'})
export class CartStore extends Store<CartState> {
  constructor() {
    super(createInitialState());
  }
}
