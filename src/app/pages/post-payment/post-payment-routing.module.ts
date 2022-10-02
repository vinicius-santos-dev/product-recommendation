import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostPaymentComponent } from './post-payment/post-payment.component';

const routes: Routes = [
  {
    path: '',
    component: PostPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPaymentRoutingModule {}
