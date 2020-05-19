import { Component, Output, Input, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-highcharts',
  templateUrl: './highcharts.component.html',
  styleUrls: ['./highcharts.component.scss']
})
export class HighchartsComponent implements OnInit {
  @Input() mockData: any;
  @Output() chartOptions;
  Highcharts = Highcharts;

  private typeMapper = {
    lineChart: 'line',
    columnChart: 'column',
    pieChart: 'pie'
  };

  ngOnInit() {
    this.mockData.form.chartType === 'pieChart' ?
      this.createPieChart() :
      this.createChart();
  }

  private createChart() {
    const chartObj = {
      chart: { type: this.typeMapper[this.mockData.form.chartType] },
      title: { text: 'Highcharts example' },
      yAxis: {
        title: {
          text: this.mockData.form.yAxis
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

    this.mockData.data.forEach(mockItem => {
      chartObj.series.push({
        name: mockItem.stock_name,
        data: mockItem[this.mockData.form.yAxis]
      });
    });
    this.chartOptions = { ...chartObj };
  }

  private createPieChart() {
    const chartObj = {

      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Highcharts example'
      },
      yAxis: {
        title: {
          text: this.mockData.form.dataSource
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
    this.mockData.data.forEach(mockItem => {
      chartObj.series[0].data.push({
        name: mockItem.stock_indusrty,
        y: mockItem[this.mockData.form.dataSource]
      });
    });

    this.chartOptions = { ...chartObj };
  }
}
