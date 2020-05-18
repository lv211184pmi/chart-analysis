import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AmchartsComponent } from './amcharts.component';
import { AmchartsRoutingModule } from './amcharts-routing.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [AmchartsComponent],
  imports: [
    CommonModule,
    AmchartsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AmchartsModule { }
