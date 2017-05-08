import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {DealModel} from "../../../models/deal.model";

@Component({
  selector: 'app-deal-component',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.scss']
})
export class DealComponent implements OnInit {

  @Input()
  public deal: DealModel;
  @Output()
  public onToggleSetting: EventEmitter<DealModel> = new EventEmitter<DealModel>();

  constructor() { }

  ngOnInit() {
  }

  setting() {
    this.onToggleSetting.emit(this.deal);
  }

}
