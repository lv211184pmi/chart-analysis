import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})
export class NgxChartsComponent implements OnInit {

  // single = [
  //   {
  //     name: 'Germany',
  //     value: 40632,
  //     extra: {
  //       code: 'de'
  //     }
  //   },
  //   {
  //     name: 'United States',
  //     value: 50000,
  //     extra: {
  //       code: 'us'
  //     }
  //   },
  //   {
  //     name: 'France',
  //     value: 36745,
  //     extra: {
  //       code: 'fr'
  //     }
  //   },
  //   {
  //     name: 'United Kingdom',
  //     value: 36240,
  //     extra: {
  //       code: 'uk'
  //     }
  //   },
  //   {
  //     name: 'Spain',
  //     value: 33000,
  //     extra: {
  //       code: 'es'
  //     }
  //   },
  //   {
  //     name: 'Italy',
  //     value: 35800,
  //     extra: {
  //       code: 'it'
  //     }
  //   }
  // ];

  single = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "2010",
          "value": 7300000
        },
        {
          "name": "2011",
          "value": 8940000
        }
      ]
    },

    {
      "name": "USA",
      "series": [
        {
          "name": "2010",
          "value": 7870000
        },
        {
          "name": "2011",
          "value": 8270000
        }
      ]
    }
  ]

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  autoScale = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  // dynamic data
  xAxisLabel;
  yAxisLabel;
  data;
  view = [900, 400]

  public barForm: FormGroup;
  public linearForm: FormGroup;
  public pieForm: FormGroup;
  private $mockData;
  public chartType = '';
  @Output() chartOptions;

  constructor(
    private fb: FormBuilder,
    private ds: DataService) {
  }

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
    let chartData = [];
    if (type === 'line' || type === 'column') {
      chartData = []
      this.$mockData.forEach(mockItem => {
        chartData.push({
          name: mockItem.stock_name,
          series: mockItem[form.value.yAxis].map((item, index) => ({
            name: `${2017 + index}`,
            value: item
          }))
        });
      });
      this.xAxisLabel = 'year';
      this.yAxisLabel = form.value.yAxis;
    } else {
      chartData = []
      this.$mockData.forEach(mockItem => {
        chartData.push({
          name: mockItem.stock_indusrty,
          value: mockItem[form.value.dataSource]
        });
      });
    }
    this.data = chartData;
    this.chartType = type;
  }
}
