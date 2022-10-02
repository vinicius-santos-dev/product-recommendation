import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpsComponent } from './nps/nps.component';
import { NpsRoutingModule } from './nps-routing.module';

@NgModule({
  declarations: [NpsComponent],
  imports: [CommonModule, NpsRoutingModule],
})
export class NpsModule {}
