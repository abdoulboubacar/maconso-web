import {CurrencyPipe} from "@angular/common";
import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {DealModel} from "../../models/deal.model";
import {StateService} from "../../services/state/state.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  public deal: DealModel;

  private year: number;

  private conso = 0;

  private chart: any;

  public unit = "EUR";

  private options = {
    chart: {
      type: 'column',
      height: 300,
      // renderTo: 'container',
      animation: {
        duration: 2000,
        easing: 'easeOutBounce'
      }
    },
    tooltip: {
      unit: this.unit,
      currencyPipe: this.currencyPipe,
      formatter: function (tooltip) {
        if (tooltip.options.unit === 'EUR') {
          return "<span class='align-center'>" + this.series.name + " " + this.key + "<br/>" + tooltip.options.currencyPipe.transform(this.y, 'EUR', true, '1.2') + "</span>";
        } else {
          return "<span class='align-center'>" + this.series.name + " " + this.key + "<br/>" + (this.y).toLocaleString() + ' ' + tooltip.options.unit + "</span>";
        }
      }
    },
    plotOptions: {
      column: {
        grouping: false,
        shadow: false,
        borderWidth: 0,
        bottom: 0
      }
    },
    title : { text : '' },
    series: [
      { data: [], name: 'Consomation', color: '', pointPadding: 0, groupPadding: 0.01},
      { data: [], name: 'Abonnement', color: '', pointPadding: 0, groupPadding: 0.01},
    ],
    xAxis: {
      gridLineWidth: 0,
      title: {
        text: ''
      },
      categories: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: 'black'
        }
      }
    },
    yAxis: {
      min: 0,
      gridLineWidth: 0,
      title: {
        text: '',
      },
      labels: ''
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 600
        }
      }]
    }
  };

  private colors = {
    ELECTRICITY: {
      conso: '#d9534f',
      subscription: '#A6201C',
    },
    GAS: {
      conso: '#f0ad4e',
      subscription: '#BD7A1B',
    },
    WATTER: {
      conso: '#0275d8',
      subscription: '#0042A5',
    },
  }

  constructor(private stateService: StateService, private currencyPipe: CurrencyPipe) {
  }

  ngOnInit() {

  }

  ngOnChanges () {
    if (this.unit !== "EUR") {
      this.unit = this.deal.resource.unit;
    }
    this.loadChartData();
  }

  changeUnit(unit: boolean) {
    if (unit) {
      this.unit = "EUR";
    } else {
      this.unit = this.deal.resource.unit;
      // this.options.tooltip.unit = this.deal.resource.unit;
    }
    this.loadChartData();
  }

  saveInstance(chartInstance) {
    this.chart = chartInstance;
    let date = new Date();
    this.year = date.getFullYear();
    this.loadChartData();
  }

  loadChartData() {
    if(!isNullOrUndefined(this.year)) {
      this.stateService.getYearData(this.deal.id, this.year, this.unit).subscribe(

        organizeData => {
          this.conso = organizeData.global.reduce((value1, value2) => value1 + value2, 0);
          this.options.tooltip.unit = this.unit;
          this.options.series = [{
              data: organizeData.global,
              name: 'Consomation',
              color: this.colors[this.deal.resource.key].conso,
              pointPadding: 0,
              groupPadding: 0.02
            },
            {
              data: organizeData.subscription,
              name: 'Abonnement',
              color: this.colors[this.deal.resource.key].subscription,
              pointPadding: 0,
              groupPadding: 0.02
            },
          ];
          this.chart.update(this.options, true);
        }
      );
    }
  }
}
