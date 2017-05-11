import {Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild} from '@angular/core';
import {DealModel} from "../../../models/deal.model";
import {StateService} from "../../services/state/state.service";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  private deal: DealModel;

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
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
      }],
      yAxes: [{
        gridLines: {
          color: "rgba(0, 0, 0, 0)",
        },
        ticks: {
          beginAtZero: true   // minimum value will be 0.
        },
      }]
    }
  };

  public chartLegend = true;
  public chartType = 'bar';

  constructor(private stateService: StateService) { }

  ngOnInit() {
   this.loadChartData();
  }

  ngOnChanges () {
    this.loadChartData();
  }

  ngAfterViewInit () {
    // console.log(this.chart);
  }

  loadChartData() {
    let date = new Date();
    this.stateService.getYearData(this.deal.id, date.getFullYear()).subscribe(
      organizeData => {
        this.chartData = [{
          data:organizeData,
          label:this.deal.name + ' ' + date.getFullYear()
        }];
      }
    );
  }

}
