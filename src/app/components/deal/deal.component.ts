import {Component, OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {DealModel} from "../../../models/deal.model";
import {StateModalComponent} from "../state-modal/state-modal.component";
import {StateModel} from "../../../models/state.model";

@Component({
  selector: 'app-deal-component',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input()
  private deal: DealModel;

  @Input()
  private  currentDeal: DealModel;

  @Output()
  private onToggleSetting: EventEmitter<DealModel> = new EventEmitter<DealModel>();

  @Output()
  private onClickDeal: EventEmitter<DealModel> = new EventEmitter<DealModel>();

  @Output()
  private onSaveStateEmitter: EventEmitter<StateModel> = new EventEmitter<StateModel>();

  @ViewChild(StateModalComponent)
  private stateModal: StateModalComponent;

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
