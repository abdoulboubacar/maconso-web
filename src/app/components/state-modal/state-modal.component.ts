import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {DealModel} from "../../models/deal.model";
import {ModalDirective} from "ngx-bootstrap";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {StateService} from "../../services/state/state.service";
import {StateModel} from "../../models/state.model";

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.scss']
})
export class StateModalComponent implements OnInit {

  @Input()
  private deal: DealModel;

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
        this.onSaveStateEmitter.emit(state);
        this.stateForm.value.statement = '';
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

    let today = new Date();
    let lastStateDate = new Date(this.deal.lastState.date);
    console.log(today);
    console.log(lastStateDate);
    console.log(this.deal.lastState.date);

    return !(lastStateDate.getDate() === today.getDate()
          && lastStateDate.getMonth() === today.getMonth()
          && lastStateDate.getFullYear() === today.getFullYear());

  }

  private toJson(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }

}
