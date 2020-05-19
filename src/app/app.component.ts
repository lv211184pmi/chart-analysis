import {
  Component,
  OnInit,
  ViewChild,
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { HighchartsComponent } from './highcharts/highcharts.component';
import { AmchartsComponent } from './amcharts/amcharts.component';
import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';
import { Ng2ChartsComponent } from './ng2-charts/ng2-charts.component';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('componentWrapper', { read: ViewContainerRef }) componentWrapper: ViewContainerRef;
  public libraries = [
    { name: 'Highcharts', value: 'highcharts' },
    { name: 'Amcharts', value: 'amcharts' },
    { name: 'NGX-charts', value: 'ngxCharts' },
    { name: 'NG2-charts', value: 'ng2Charts' },
  ];

  public chartTypes = [
    { name: 'Column chart', value: 'columnChart' },
    { name: 'Linear chart', value: 'lineChart' },
    { name: 'Pie chart', value: 'pieChart' }
  ];

  public pieOptions = [
    { name: 'Profit capacity', value: 'profit_capacity' },
    { name: 'GDP Share, %', value: 'GDP_share' }
  ];

  public otherOptions = [
    { name: 'Market Capacity, billion $', value: 'monthly_revenue' },
    { name: 'Annual Revenue, billion $', value: 'annual_revenue' }
  ];

  public chartForm: FormGroup;

  private componentMapper = {
    highcharts: HighchartsComponent,
    amcharts: AmchartsComponent,
    ngxCharts: NgxChartsComponent,
    ng2Charts: Ng2ChartsComponent
  };
  private componentRef: ComponentRef<any>;
  private $mockData;

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.ds.getData().subscribe(data => {
      this.$mockData = data;
    });
    this.chartForm = this.fb.group({
      libraryName: [null],
      chartType: [null],
      xAxis: [null], disabled: true,
      yAxis: [null],
      dataSource: [null]
    });
  }

  public onCreateChart() {
    this.componentWrapper.clear();
    const componentFactory = this.componentMapper[this.chartForm.value.libraryName];
    if (!componentFactory) {
      return;
    }

    const factory = this.resolver.resolveComponentFactory(componentFactory);

    this.componentRef = this.componentWrapper.createComponent(factory);
    this.componentRef.instance.mockData = {
      data: this.$mockData,
      form: this.chartForm.value
    };
  }
}
