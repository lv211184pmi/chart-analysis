import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'highcharts',
    pathMatch: 'full'
  },
  {
    path: 'highcharts',
    loadChildren: () => import('./highcharts/highcharts.module').then(m => m.HighchartsModule)
  },
  {
    path: 'ngx-charts',
    loadChildren: () => import('./ngx-charts/ngx-charts.module').then(m => m.NgxChartModule)
  },
  {
    path: 'amcharts',
    loadChildren: () => import('./amcharts/amcharts.module').then(m => m.AmchartsModule)
  },
  {
    path: 'ng2-charts',
    loadChildren: () => import('./ng2-charts/ng2-charts.module').then(m => m.Ng2ChartsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
