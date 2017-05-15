import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {DealModel} from "../../models/deal.model";
import {ModalDirective} from "ngx-bootstrap";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {StateService} from "../../services/state/state.service";
import {StateModel} from "../../models/state.model";
import * as moment from 'moment';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.scss']
})
export class StateModalComponent implements OnInit {

  @Input()
  public deal: DealModel;

  private stateForm: FormGroup;
  public statementCtrl: FormControl;
  private errorMessage: string;
  private hasError = false;
  private lastState: StateModel;

  @ViewChild('stateModal')
  public stateModal: ModalDirective;

  @Output()
  public onSaveStateEmitter: EventEmitter<StateModel> = new EventEmitter<StateModel>();

  constructor(
    private fb: FormBuilder,
    private stateService: StateService
  ) { }

  ngOnInit() {
    this.statementCtrl = this.fb.control('', Validators.required);
    this.stateForm = this.fb.group({
      statement: this.statementCtrl,
    });
  }

  public showStateModal() {
    this.stateModal.show();
  }

  submitState() {
    this.stateService.createState(this.deal.id, {'value': this.stateForm.value.statement}).subscribe(
      state => {
        this.stateModal.hide();
        this.stateForm.reset();
        this.onSaveStateEmitter.emit(state);
      },
      error => {
        this.hasError = true;
        this.errorMessage = this.toJson(error._body).message + ' ' +this.toJson(error._body).value
      }
    );
  }

  canShowForm(): boolean {
    if (this.deal.lastState === null) {
      return true;
    }

    let today = moment(new Date());
    let lastStateDate =  moment(this.deal.lastState.date);

    return today.format('DD-MM-YYYY') !== lastStateDate.format('DD-MM-YYYY');
  }

  private toJson(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

}
