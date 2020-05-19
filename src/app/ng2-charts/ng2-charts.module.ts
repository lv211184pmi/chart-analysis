import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ChartsComponent } from './ng2-charts.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [Ng2ChartsComponent],
  imports: [
    CommonModule,
    ChartsModule,
  ]
})
export class Ng2ChartsModule { }
