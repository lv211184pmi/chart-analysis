import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2ChartsComponent } from './ng2-charts.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NG2chartsRoutingModule } from './ng2-charts-routing.module';



@NgModule({
  declarations: [Ng2ChartsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartsModule,
    NG2chartsRoutingModule
  ]
})
export class Ng2ChartsModule { }
