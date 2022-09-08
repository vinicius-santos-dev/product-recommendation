import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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

  constructor(private router: Router) {}

  ngOnInit(): void {}

  public goToPayment(): void {
    this.router.navigate(['payment']);
  }
}
