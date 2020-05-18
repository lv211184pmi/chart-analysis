import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AmchartsComponent } from './amcharts.component';

const routes: Routes = [
  { path: '', component: AmchartsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmchartsRoutingModule { }
