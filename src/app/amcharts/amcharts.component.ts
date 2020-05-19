import { Component, OnInit, NgZone, OnDestroy, Input } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-amcharts',
  templateUrl: './amcharts.component.html',
  styleUrls: ['./amcharts.component.scss']
})
export class AmchartsComponent implements OnInit, OnDestroy {
  @Input() mockData: any;
  public chart;
  private typeMapper = {
    lineChart: 'line',
    columnChart: 'column',
    pieChart: 'pie'
  };

  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.createChart();
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        this.chart.dispose();
      }, 0);
    });
  }

  private createChart() {
    switch (this.typeMapper[this.mockData.form.chartType]) {
      case 'pie':
        this.chart = am4core.create('chartDiv', am4charts.PieChart);
        const pieSeries = this.chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = 'parameter';
        pieSeries.dataFields.category = 'industry';
        break;
      case 'line':
        this.chart = am4core.create('chartDiv', am4charts.XYChart);
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
    this.mockData.data.forEach(mockItem => {
      this.chart.data.push({
        industry: mockItem.stock_indusrty,
        parameter: this.typeMapper[this.mockData.form.chartType] === 'pie' ?
          mockItem[this.mockData.form.dataSource] :
          mockItem[this.mockData.form.yAxis][0]
      });
    });
  }
}
