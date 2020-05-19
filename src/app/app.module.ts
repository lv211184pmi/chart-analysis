import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartModule } from './ngx-charts/ngx-charts.module';
import { Ng2ChartsModule } from './ng2-charts/ng2-charts.module';
import { HighchartsModule } from './highcharts/highcharts.module';
import { AmchartsModule } from './amcharts/amcharts.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxChartModule,
    Ng2ChartsModule,
    HighchartsModule,
    AmchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
