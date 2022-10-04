import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {InvoiceService} from "../../services/invoice/invoice.service";
import {BoughtProduct, BoughtProductParams, PaymentMethod, ProductParams} from "../../models";
import {CartQuery} from 'src/app/stores/cart/cart.query';
import {UserQuery} from "../../stores/user/user.query";
import {take} from "rxjs";

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss'],
})
export class PaymentModalComponent implements OnInit, DoCheck {
  public index = 0;

  public isLoading = false;

  public products = Object.values(this.cartQuery.products);
  public user = this.userQuery.user;

  public paymentMethods: {
    slug: PaymentMethod;
    name: string;
    image: string;
    description: string;
  }[] = [
    {
      slug: PaymentMethod.TRANSFER,
      name: 'PIX',
      description: 'Texto do PIX',
      image: '../../../assets/pix-image.png',
    },
    {
      slug: PaymentMethod.CREDIT_CARD,
      name: 'Cartão de crédito/débito',
      description: 'Texto do Cartão',
      image: '../../../assets/credit-card-image.png',
    },
    {
      slug: PaymentMethod.CASH,
      name: 'Dinheiro',
      description: 'Texto do Dinheiro',
      image: '../../../assets/money-image.png',
    },
  ];

  public selectedPaymentMethod: PaymentMethod | undefined;

  constructor(
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    private router: Router,
    private invoiceService: InvoiceService,
    private cartQuery: CartQuery,
    private userQuery: UserQuery
  ) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.index === 2 || this.index === 3) {
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

  public selectPaymentMethod(paymentMethod: PaymentMethod): void {
    this.selectedPaymentMethod = paymentMethod;
  }

  public onConfirmPaymentMethod(): void {
    const productsParams: BoughtProductParams[] = [];

    for (const product of Object.values(this.cartQuery.products)) {
      const param: BoughtProductParams = {
        name: product.name,
        price: product.price,
        categoryId: product.category.slug,
        product: {id: product.id}
      }

      for (let i = 0; i < product.quantity; i++) {
        productsParams.push(param);
      }
    }

    this.invoiceService.createInvoice({
      paymentMethod: this.selectedPaymentMethod,
      buyer: this.user?.id,
      total: this.cartQuery.total,
      products: productsParams
    }).pipe(take(1)).subscribe();

    if (this.selectedPaymentMethod === 'TRANSFER') {
      this.nextStep();
    }

    if (this.selectedPaymentMethod === 'CREDIT_CARD' || this.selectedPaymentMethod === 'DEBIT_CARD') {
      this.index = 3;
    }

    if (this.selectedPaymentMethod === 'CASH') {
      this.index = 4;
    }
  }

  public onGoToPostPayment(): void {
    this.dialogRef.close();
    this.router.navigate(['/post-payment']).then();
  }

  private startLoading(): void {
    this.isLoading = true;
  }
}
