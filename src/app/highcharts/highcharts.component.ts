import { Component, OnInit, Output } from '@angular/core';

import * as Highcharts from 'highcharts';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
  public barForm: FormGroup;
  public linearForm: FormGroup;
  public pieForm: FormGroup;
  private $mockData;

  Highcharts = Highcharts;
  @Output() chartOptions;

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
    const chartObj = {
      chart: { type },
      title: { text: form.value.chartName },
      yAxis: {
        title: {
          text: form.value.yAxis
        }
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2017 to 2019'
        }
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2017
        }
      },
      series: [],
    };

    this.$mockData.forEach(mockItem => {
      chartObj.series.push({
        name: mockItem.stock_name,
        data: mockItem[form.value.yAxis]
      });
    });
    this.chartOptions = { ...chartObj };
  }

  public createPieChart(form) {
    const chartObj = {

      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: form.value.chartName
      },
      yAxis: {
        title: {
          text: form.value.dataSource
        }
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'part, %',
        colorByPoint: true,
        data: []
      }]
    };
    this.$mockData.forEach(mockItem => {
      chartObj.series[0].data.push({
        name: mockItem.stock_indusrty,
        y: mockItem[form.value.dataSource]
      });
    });

    this.chartOptions = { ...chartObj };
  }
}
