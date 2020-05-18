import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-amcharts',
  templateUrl: './amcharts.component.html',
  styleUrls: ['./amcharts.component.scss']
})
export class AmchartsComponent implements OnInit, OnDestroy {
  public chart;
  public barForm: FormGroup;
  public linearForm: FormGroup;
  public pieForm: FormGroup;
  private $mockData;

  constructor(
    private fb: FormBuilder,
    private ds: DataService,
    private zone: NgZone
  ) { }

  ngOnInit() {
    this.ds.getData().subscribe(data => {
      this.$mockData = data;
    });

    this.barForm = this.fb.group({
      chartName: [''],
      xAxis: [''], disabled: true,
      yAxis: ['']
    });

    this.linearForm = this.fb.group({
      chartName: [''],
      xAxis: [''], disabled: true,
      yAxis: ['']
    });

    this.pieForm = this.fb.group({
      chartName: [''],
      dataSource: ['']
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  createChart(form, type) {
    this.chart = {};
    // let chart;
    switch (type) {
      case 'pie':
        this.chart = am4core.create('pieChartDiv', am4charts.PieChart);
        const pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'parameter';
        pieSeries.dataFields.category = 'industry';
        break;
      case 'line':
        this.chart = am4core.create('pieChartDiv', am4charts.XYChart);
        const categoryAxis = this.chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = 'industry';
        categoryAxis.title.text = 'Industrie name';

        const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = 'Profit capacity($b)';

        const series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = 'parameter';
        series.dataFields.categoryX = 'industry';
        break;
      case 'column':
        break;
    }

    this.chart.paddingRight = 20;
    this.$mockData.forEach(mockItem => {
      this.chart.data.push({
        industry: mockItem.stock_indusrty,
        parameter: type === 'pie' ?
          mockItem[form.value.dataSource] :
          mockItem[form.value.yAxis][0]
      });
    });
  }
}
