import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { HighchartsComponent } from './highcharts.component';
import { HighchartsRoutingModule } from './highcharts-routing.module';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [HighchartsComponent],
  imports: [
    CommonModule,
    HighchartsRoutingModule,
    MaterialModule,
    HighchartsChartModule,
    ReactiveFormsModule
  ]
})
export class HighchartsModule { }
