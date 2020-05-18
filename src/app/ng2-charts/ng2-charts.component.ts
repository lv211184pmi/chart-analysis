import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataService } from '../data.service';

@Component({
  selector: 'app-ng2-charts',
  templateUrl: './ng2-charts.component.html',
  styleUrls: ['./ng2-charts.component.scss']
})
export class Ng2ChartsComponent implements OnInit {
  public chartData;
  public barForm: FormGroup;
  public linearForm: FormGroup;
  public pieForm: FormGroup;
  private $mockData;
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

  constructor(
    private fb: FormBuilder,
    private ds: DataService
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

  public createChart(form, type) {
    this.chartData = [];
    this.chartLabels = [];
    if (type === 'line' || type === 'bar') {
      this.$mockData.forEach(mockItem => {
        this.chartData.push({
          data: mockItem[form.value.yAxis],
          label: mockItem.stock_indusrty
        });
      });
      this.chartLabels = ['2017', '2018', '2019'];
    } else if (type === 'pie') {
      this.$mockData.forEach(mockItem => {
        this.chartData.push(mockItem[form.value.dataSource]);
        this.chartLabels.push(mockItem.stock_indusrty);
      });
    }
    this.chartType = type;
  }

}
