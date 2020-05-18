import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsComponent } from './ngx-charts.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NGXChartsRoutingModule } from './ngx-charts-routing.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [NgxChartsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    NGXChartsRoutingModule,
    NgxChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NgxChartModule { }
