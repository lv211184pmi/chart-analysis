import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-ng2-charts',
  templateUrl: './ng2-charts.component.html',
  styleUrls: ['./ng2-charts.component.scss']
})
export class Ng2ChartsComponent implements OnInit {
  @Input() mockData: any;
  public chartData;
  public chartLabels = [];
  public chartOptions = {
    responsive: true,
  };
  public chartColors = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public chartLegend = true;
  public chartType = '';
  private typeMapper = {
    lineChart: 'line',
    columnChart: 'column',
    pieChart: 'pie'
  };

  ngOnInit() {
    this.chartData = [];
    this.chartLabels = [];
    if (this.mockData.form.chartType !== 'pieChart') {
      this.mockData.data.forEach(mockItem => {
        this.chartData.push({
          data: mockItem[this.mockData.form.yAxis],
          label: mockItem.stock_indusrty
        });
      });
      this.chartLabels = ['2017', '2018', '2019'];
    } else {
      this.mockData.data.forEach(mockItem => {
        this.chartData.push(mockItem[this.mockData.form.dataSource]);
        this.chartLabels.push(mockItem.stock_indusrty);
      });
    }
    this.chartType = this.typeMapper[this.mockData.form.chartType];
  }
}
