import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {Router} from '@angular/router';
import {PaymentModalComponent} from 'src/app/components/payment-modal/payment-modal.component';
import {ProductsQuery} from "../../../stores/products/products.query";
import {UnsubscribeMixin} from "../../../utils";
import {filter, takeUntil} from "rxjs";
import {Category, Product, ProductParams} from "../../../models";
import {ProductsService} from "../../../stores/products/products.service";
import {CartService} from "../../../stores/cart/cart.service";
import {CartQuery} from "../../../stores/cart/cart.query";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({right: '0'})),
      state('rotate', style({transform: 'rotate(180deg)'})),
      transition('void => show', [animate('0.3s ease-in-out')]),
      transition('show => void', [animate('0.3s ease-in-out')]),
      transition('void => rotate', [animate('0.3s ease-in-out')]),
      transition('rotate => void', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ProductsComponent extends UnsubscribeMixin implements OnInit {
  public categories: Category[] = [];
  public productsByCategory: Record<string, Product[]>;
  public products: Product[] = [];
  public hasToShow = false;
  public quantity = 0;
  public total = 0;
  public modalConfig = {
    height: '79vh',
    width: '80vw',
  };

  public cartProducts: ProductParams[] = [];

  public selectedTab: string;

  public isLoading = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private productsQuery: ProductsQuery,
    private productsService: ProductsService,
    private cartService: CartService,
    private cartQuery: CartQuery
  ) {
    super();

    this.productsQuery.products$
    .pipe(
      filter((products) => products && products.length > 0),
      takeUntil(this.unsubscribe$))
    .subscribe((products: Product[]) => {
      this.isLoading = true;

      this.categories = [];
      this.products = [];

      this.categories = products
      .map((product) => product.category)
      .filter(
        (category, index, array) => {
          return array.findIndex((c) => c.slug === category.slug) === index;
        }
      );

      this.selectedTab = this.categories[0].slug;

      this.productsByCategory = products.reduce((acc, product) => {
        if (!acc.hasOwnProperty(product.category.slug)) {
          acc[product.category.slug] = [];
        }

        acc[product.category.slug].push(product);

        return acc;
      }, {});

      this.products = products;

      this.isLoading = false;
    });

    this.productsService.loadRecommendations().pipe(takeUntil(this.unsubscribe$)).subscribe();

    this.cartQuery.products$.pipe(
      filter((products) => products && Object.values(products).length > 0),
      takeUntil(this.unsubscribe$)).subscribe((products: Record<string, ProductParams>) => {
      this.cartProducts = Object.values(products);
    });

    this.cartQuery.total$.pipe(takeUntil(this.unsubscribe$)).subscribe((total) => {
      this.total = total;
    })
  }

  ngOnInit(): void {
  }

  public openPaymentModal(): void {
    this.matDialog.open(PaymentModalComponent, this.modalConfig);
  }

  public onGoToPayment(): void {
    this.router.navigate(['payment']).then();
  }

  public showOrHide(): void {
    this.hasToShow = !this.hasToShow;
  }

  public add(product: any): void {
    this.cartService.addProduct(product);
  }

  public onRemoveProduct(product: Product): void {
    this.cartService.removeProduct(product);
  }

  public onSelectTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.tab.textLabel;
  }

  public onAddProductToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
