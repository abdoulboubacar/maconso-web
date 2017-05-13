import {Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild} from '@angular/core';
import {DealModel} from "../../models/deal.model";
import {StateService} from "../../services/state/state.service";
import {BaseChartDirective} from "ng2-charts";
import {isNullOrUndefined} from "util";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input()
  private deal: DealModel;

  private year: number;

  private conso = 0;

  @ViewChild(BaseChartDirective) private chart: BaseChartDirective;

  public chartData: Array<any> = [
    {data: [], label: ''}
  ];

  public chartElectricityColours: Array<any> = [
    {
      backgroundColor: '#d9534f',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public chartGasColours: Array<any> = [
    {
      backgroundColor: '#f0ad4e',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public chartWatterColours: Array<any> = [
    {
      backgroundColor: '#0275d8',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public chartLabels: Array<any> = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        categoryPercentage: 1,
        barPercentage: 0.98,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      }],
      yAxes: [{
        display: false,
        // categoryPercentage: 0.1,
        // barPercentage: 1.9,
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
          beginAtZero: true   // minimum value will be 0.
        },
      }]
    }
  };

  public chartLegend = false;
  public chartType = 'bar';

  constructor(private stateService: StateService) { }

  ngOnInit() {
    let date = new Date();
    this.year = date.getFullYear();
    this.loadChartData();
  }

  ngOnChanges () {
    this.loadChartData();
  }


  loadChartData() {
    if(!isNullOrUndefined(this.year)) {
      this.stateService.getYearData(this.deal.id, this.year).subscribe(

        organizeData => {
          this.conso = organizeData.reduce((value1, value2) => value1 + value2, 0);
          this.chartData = [{
            data: organizeData,
            // label: this.deal.name + ' ' + this.year
            fill: true
          }];
        }
      );
    }
  }

}
