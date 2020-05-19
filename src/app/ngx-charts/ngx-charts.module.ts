import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsComponent } from './ngx-charts.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [NgxChartsComponent],
  imports: [
    CommonModule,
    NgxChartsModule
  ]
})
export class NgxChartModule { }
