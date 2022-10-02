import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NpsComponent } from './nps/nps.component';

const routes: Routes = [
  {
    path: '',
    component: NpsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NpsRoutingModule {}
