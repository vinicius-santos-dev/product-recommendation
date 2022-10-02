import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostPaymentComponent } from './post-payment/post-payment.component';
import { PostPaymentRoutingModule } from './post-payment-routing.module';

@NgModule({
  declarations: [PostPaymentComponent],
  imports: [CommonModule, PostPaymentRoutingModule],
})
export class PostPaymentModule {}
