import {
  Component,
  Output,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})
export class NgxChartsComponent implements OnInit {
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public showYAxisLabel = true;
  public autoScale = true;
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public xAxisLabel;
  public yAxisLabel;
  public data;
  public view = [900, 400]
  public chartType = '';
  @Input() mockData: any;
  @Output() chartOptions;

  private typeMapper = {
    lineChart: 'line',
    columnChart: 'column',
    pieChart: 'pie'
  };

  ngOnInit() {
    let chartData = [];
    if (this.mockData.form.chartType === 'lineChart' || this.mockData.form.chartType === 'columnChart') {
      chartData = [];
      this.mockData.data.forEach(mockItem => {
        chartData.push({
          name: mockItem.stock_name,
          series: mockItem[this.mockData.form.yAxis].map((item, index) => ({
            name: `${2017 + index}`,
            value: item
          }))
        });
      });
      this.xAxisLabel = 'year';
      this.yAxisLabel = this.mockData.form.yAxis;
    } else {
      chartData = []
      this.mockData.data.forEach(mockItem => {
        chartData.push({
          name: mockItem.stock_indusrty,
          value: mockItem[this.mockData.form.dataSource]
        });
      });
    }
    this.data = chartData;
    this.chartType = this.typeMapper[this.mockData.form.chartType];
  }
}
