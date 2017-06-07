import {Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef} from '@angular/core';
import {DealModel} from "../../models/deal.model";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input()
  public deal: DealModel;

  @ViewChild('input')
  private input: ElementRef;

  @Output()
  private onToggleEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    if (this.input.nativeElement.value === 'on') {
      this.input.nativeElement.value = 'off';
      this.onToggleEmitter.emit(false);
    } else {
      this.input.nativeElement.value = 'on';
      this.onToggleEmitter.emit(true);
    }
  }

}
