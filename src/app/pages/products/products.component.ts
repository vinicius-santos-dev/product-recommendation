import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { PaymentModalComponent } from 'src/app/components/payment-modal/payment-modal.component';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    trigger('showHide', [
      state('show', style({ right: '0' })),
      state('rotate', style({ transform: 'rotate(180deg)' })),
      transition('void => show', [animate('0.3s ease-in-out')]),
      transition('show => void', [animate('0.3s ease-in-out')]),
      transition('void => rotate', [animate('0.3s ease-in-out')]),
      transition('rotate => void', [animate('0.3s ease-in-out')]),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  public categories: string[] = [];

  public productsByCategory: any;

  public products: any[] = [];

  public hasToShow = false;

  public quantity = 1;

  public modalConfig = {
    height: '79vh',
    width: '80vw',
  };

  public selectedTab: string;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private productsService: ProductsService
  ) {
    this.productsService.recommendProductsWithoutUser().subscribe(
      (
        data: {
          category: string;
          id: number;
          name: string;
          price: number;
        }[]
      ) => {
        // console.log(data);

        this.categories = data
          .map((product) => product.category)
          .filter(
            (category, index, array) => array.indexOf(category) === index
          );

        this.selectedTab = this.categories[0];

        this.productsByCategory = data.reduce((acc, product) => {
          if (!acc.hasOwnProperty(product.category)) {
            acc[product.category] = [];
          }

          acc[product.category].push(product);

          return acc;
        }, {});

        this.products = data;

        console.log(this.categories);
      }
    );
  }

  ngOnInit(): void {}

  public openPaymentModal(): void {
    this.matDialog.open(PaymentModalComponent, this.modalConfig);
  }

  public goToPayment(): void {
    this.router.navigate(['payment']);
  }

  public showOrHide(): void {
    this.hasToShow = !this.hasToShow;
  }

  public add(): void {
    this.quantity++;
  }

  public subtract(): void {
    if (this.quantity >= 1) {
      this.quantity--;
    }
  }

  public onSelectTabChange(event: MatTabChangeEvent): void {
    this.selectedTab = event.tab.textLabel;
  }
}
