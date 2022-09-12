import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentModalComponent } from './payment-modal.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [PaymentModalComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
})
export class PaymentModalModule {}
