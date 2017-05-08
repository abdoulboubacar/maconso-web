import {Component, OnInit, ViewChild, Input, Renderer2, AfterViewInit} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DealModel} from "../../../models/deal.model";
import {DealService} from "../../services/deal/deal.service";
import {isNullOrUndefined} from "util";
import {UserModel} from "../../../models/user.model";
import {StorageService} from "../../services/storage/storage.service";
import {ResourceModel} from "../../../models/resource.model";
import {ResourceService} from "../../services/resource/resource.service";

@Component({
  selector: 'app-deal-modal-component',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss']
})
export class DealModalComponent implements OnInit, AfterViewInit {

  @Input()
  public user: UserModel;
  public deal: DealModel = new DealModel();
  @Input()
  public resources;
  public dealForm: FormGroup;
  public resourceCtrl: FormControl;
  public supplierCtrl: FormControl;
  public unitPriceCtrl: FormControl;
  public nameCtrl: FormControl;
  @ViewChild('dealModal') public dealModal: ModalDirective;
  @ViewChild('dealModalDialog') public dealModalDialog: any;
  public selectedFormResource: ResourceModel;

  constructor(
    private dealService: DealService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private renderer: Renderer2,
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.resourceCtrl = this.fb.control('', Validators.required);
    this.supplierCtrl = this.fb.control('', Validators.required);
    this.unitPriceCtrl = this.fb.control('', Validators.required);
    this.nameCtrl = this.fb.control('', Validators.required);

    this.dealForm = this.fb.group({
      resource: this.resourceCtrl,
      supplier: this.supplierCtrl,
      unitPrice: this.unitPriceCtrl,
      name: this.nameCtrl
    });

    // this.setFormValues();
  }

  ngAfterViewInit() {
    this.dealModal.onHide.subscribe(success => {
      this.deal = new DealModel();
      this.resetFormValues();
    });

    this.dealModal.onShow.subscribe(success => {
      this.render();
    });
  }

  private resetFormValues() {
    this.dealForm.setValue({
      'resource': '',
      'name': '',
      'unitPrice': '',
      'supplier': ''
    });
    this.selectedFormResource = null;
  }

  private hide() {
    this.dealModal.hide();
  }

  submitDeal() {
    this.deal.name = this.dealForm.value.name;
    this.deal.resource = this.dealForm.value.resource;
    this.deal.unitPrice = this.dealForm.value.unitPrice;
    this.deal.supplier = this.dealForm.value.supplier;

    if (isNullOrUndefined(this.deal.id)) {
      this.dealService.createDeal(this.deal).subscribe(
        deal => {
          this.user.deals = this.user.deals.concat([deal]);
          this.storageService.save("user", this.user);
          this.dealForm.reset();
          this.dealModal.hide();
        }
      );
    }
  }

  render() {
    let cssClass = 'modal-conso-default';
    if(!isNullOrUndefined(this.dealForm.value.resource)) {
      cssClass = 'modal-conso-' + this.dealForm.value.resource.toLowerCase();
      this.resourceService.getResource(this.dealForm.value.resource).subscribe(
        resource => {this.selectedFormResource = resource}
      );
    }
    this.applyClass(cssClass);
  }

  applyClass(newcssClass: string) {
    // this.renderer.removeClass(this.dealModalDialog.nativeElement, 'modal-conso-default');
    this.renderer.removeClass(this.dealModalDialog.nativeElement, 'modal-conso-gas');
    this.renderer.removeClass(this.dealModalDialog.nativeElement, 'modal-conso-electricity');
    this.renderer.removeClass(this.dealModalDialog.nativeElement, 'modal-conso-watter');
    this.renderer.addClass(this.dealModalDialog.nativeElement, newcssClass);
  }

  showDealModal(deal: DealModel) {
    this.deal = deal;
    let resourceKey = '';
    if (deal.resource != null) {
      resourceKey = deal.resource.key;
    }
    this.dealForm.setValue({
      'resource': resourceKey,
      'name': deal.name,
      'unitPrice': deal.unitPrice,
      'supplier': deal.supplier
    });
    this.dealModal.show();
  }

}
