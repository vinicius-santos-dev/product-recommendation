import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit {
  public index = 0;

  public products = [
    { name: 'Banana', price: 'R$ 2,00' },
    { name: 'Maçã', price: 'R$ 3,00' },
    { name: 'Pera', price: 'R$ 4,00' },
    { name: 'Uva', price: 'R$ 5,00' },
    { name: 'Melancia', price: 'R$ 6,00' },
    { name: 'Abacaxi', price: 'R$ 7,00' },
  ];

  public paymentMethods = [
    {slug: 'pix', name: 'PIX', description: 'Texto do PIX', image: '../../../assets/pix-image.png' },
    {slug: 'credit-card', name: 'Cartão de crédito/débito', description: 'Texto do Cartão', image: '../../../assets/credit-card-image.png' },
    {slug: 'money', name: 'Dinheiro', description: 'Texto do Dinheiro', image: '../../../assets/money-image.png' },
  ];

  public selectedPaymentMethod: string | undefined;

  constructor(private dialogRef: MatDialogRef<PaymentModalComponent>) {}

  ngOnInit(): void {}

  public closeModal(): void {
    this.dialogRef.close();
  }

  public nextStep(): void {
    this.index++;
  }

  public selectPaymentMethod(paymentMethod: string): void {
    this.selectedPaymentMethod = paymentMethod;
  }

  public previousStep(): void {
    this.index--;
  }

  public confirmPaymentMethod(): void {
    console.log(this.selectedPaymentMethod);
  }
}
