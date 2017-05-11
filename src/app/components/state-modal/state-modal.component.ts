import {Component, OnInit, Input, ViewChild, EventEmitter, Output} from '@angular/core';
import {DealModel} from "../../../models/deal.model";
import {ModalDirective} from "ngx-bootstrap";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {StateService} from "../../services/state/state.service";
import {StateModel} from "../../../models/state.model";

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
        // window.location.href = '/';
      },
      error => {
        console.log(error);
      }
    );
  }

}
