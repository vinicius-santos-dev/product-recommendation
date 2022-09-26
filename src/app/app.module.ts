import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModalModule } from './components/payment-modal/payment-modal.module';
import { NpsComponent } from './pages/nps/nps.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PaymentModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
