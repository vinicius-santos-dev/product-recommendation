import { Injectable } from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Product} from "../../models";

export interface ProductsState extends EntityState<Product, number> {
}

@Injectable({ providedIn: 'root' })
@StoreConfig({name: 'products'})
export class ProductsStore extends EntityStore<ProductsState> {
  constructor() {
    super();
  }
}
