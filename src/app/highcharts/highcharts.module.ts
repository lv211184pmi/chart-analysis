import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';

import { HighchartsComponent } from './highcharts.component';


@NgModule({
  declarations: [HighchartsComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
  ]
})
export class HighchartsModule { }
