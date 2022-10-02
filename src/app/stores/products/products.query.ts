import {QueryEntity} from '@datorama/akita';
import {ProductsState, ProductsStore} from "./products.store";
import {Observable} from "rxjs";
import {Product} from "../../models";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ProductsQuery extends QueryEntity<ProductsState> {
  public products$: Observable<Product[]>;

  constructor(protected override store: ProductsStore) {
    super(store);

    this.products$ = this.selectAll();
  }
}
