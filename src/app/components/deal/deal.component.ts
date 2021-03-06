import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DealModel} from "../../models/deal.model";
import {StateModalComponent} from "../state-modal/state-modal.component";
import {StateModel} from "../../models/state.model";

@Component({
  selector: 'app-deal-component',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input()
  public deal: DealModel;

  @Input()
  public  currentDeal: DealModel;

  @Output()
  private onToggleSetting: EventEmitter<DealModel> = new EventEmitter<DealModel>();

  @Output()
  private onClickDeal: EventEmitter<DealModel> = new EventEmitter<DealModel>();

  @Output()
  private onSaveStateEmitter: EventEmitter<StateModel> = new EventEmitter<StateModel>();

  @ViewChild(StateModalComponent)
  private stateModal: StateModalComponent;



  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ],
      label: ''
    }
  ];
  public lineChart3Labels: Array<any> = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  public lineChart3Options: any = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';

  constructor() { }

  ngOnInit() {
  }

  setting() {
    this.onToggleSetting.emit(this.deal);
  }

  loadDeal() {
    this.onClickDeal.emit(this.deal);
  }

  releve() {
    this.stateModal.showStateModal();
  }

  onSaveState(state: StateModel) {
    this.onSaveStateEmitter.emit(state);
  }

}
