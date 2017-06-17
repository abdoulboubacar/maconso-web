import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  @Input()
  private plan;

  @Input()
  private resources;

  @Input()
  private current;

  @Output()
  private onSelectPlan: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  emitSelectEvent() {
    this.onSelectPlan.emit(this.plan);
  }

}
