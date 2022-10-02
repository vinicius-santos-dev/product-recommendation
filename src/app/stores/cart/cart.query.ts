import {Query} from '@datorama/akita';
import {CartState, CartStore} from "./cart.store";
import {filter, map, Observable} from "rxjs";
import {Product, ProductParams} from "../../models";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class CartQuery extends Query<CartState> {
  public products$: Observable<Record<string, ProductParams>>;
  public similar$: Observable<Product[]>;
  public total$: Observable<number>;

  public get products(): Record<string, ProductParams> {
    return this.getValue().products;
  }

  public get similar(): Product[] {
    return this.getValue().similar;
  }

  public get total(): number {
    return this.getTotal(Object.values(this.products));
  }

  constructor(protected override store: CartStore) {
    super(store);

    this.products$ = this.select('products');
    this.similar$ = this.select('similar');
    this.total$ = this.products$.pipe(
      filter(products => products && Object.values(products).length > 0),
      map((products: Record<string, ProductParams>) => this.getTotal(Object.values(products))))
    ;
  }

  private getTotal(products: ProductParams[]): number {
    return products.reduce((total: number, product: ProductParams) => {
      return total + (product.quantity * product.price);
    }, 0);
  }
}
