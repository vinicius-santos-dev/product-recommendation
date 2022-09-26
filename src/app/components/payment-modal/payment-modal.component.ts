import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit, DoCheck {
  public index = 0;

  public isLoading = false;

  public products = [
    { name: 'Banana', price: 'R$ 2,00' },
    { name: 'Maçã', price: 'R$ 3,00' },
    { name: 'Pera', price: 'R$ 4,00' },
    { name: 'Uva', price: 'R$ 5,00' },
    { name: 'Melancia', price: 'R$ 6,00' },
    { name: 'Abacaxi', price: 'R$ 7,00' },
  ];

  public paymentMethods = [
    {
      slug: 'pix',
      name: 'PIX',
      description: 'Texto do PIX',
      image: '../../../assets/pix-image.png',
    },
    {
      slug: 'credit-card',
      name: 'Cartão de crédito/débito',
      description: 'Texto do Cartão',
      image: '../../../assets/credit-card-image.png',
    },
    {
      slug: 'money',
      name: 'Dinheiro',
      description: 'Texto do Dinheiro',
      image: '../../../assets/money-image.png',
    },
  ];

  public selectedPaymentMethod: string | undefined;

  constructor(
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    if (this.index === 2) {
      setTimeout(() => {
        this.startLoading();
      }, 3000);

      setTimeout(() => {
        this.dialogRef.close();
        this.router.navigate(['/post-payment']);
      }, 6000);
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public nextStep(): void {
    this.index++;
  }

  public previousStep(): void {
    this.index--;
  }

  public selectPaymentMethod(paymentMethod: string): void {
    this.selectedPaymentMethod = paymentMethod;
  }

  public confirmPaymentMethod(): void {
    console.log(this.selectedPaymentMethod);
    if (this.selectedPaymentMethod === 'pix') {
      this.nextStep();
    }
  }

  private startLoading(): void {
    this.isLoading = true;
  }
}
