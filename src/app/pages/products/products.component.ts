import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public categories = [
    { name: 'Todos' },
    { name: 'Frutas' },
    { name: 'Vegetais' },
    { name: 'Lanches' },
  ];

  // generate 10 products with name and price
  public products = [
    { name: 'Banana', price: 'R$ 2,00' },
    { name: 'Maçã', price: 'R$ 3,00' },
    { name: 'Pera', price: 'R$ 4,00' },
    { name: 'Uva', price: 'R$ 5,00' },
    { name: 'Melancia', price: 'R$ 6,00' },
    { name: 'Abacaxi', price: 'R$ 7,00' },
  ];

  public hasToShow = false;

  public quantity = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
  
}
