import {Component, OnInit, ViewChild, Input, Renderer2, AfterViewInit, OnChanges} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import {DealModel} from "../../models/deal.model";
import {DealService} from "../../services/deal/deal.service";
import {isNullOrUndefined} from "util";
import {UserModel} from "../../models/user.model";
import {StorageService} from "../../services/storage/storage.service";
import {ResourceModel} from "../../models/resource.model";
import {ResourceService} from "../../services/resource/resource.service";

@Component({
  selector: 'app-deal-modal-component',
  templateUrl: './deal-modal.component.html',
  styleUrls: ['./deal-modal.component.scss']
})
export class DealModalComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  private user: UserModel;

  private deal: DealModel = DealModel.getDefaultDeal();

  @Input()
  private resources;

  private dealForm: FormGroup;
  private resourceCtrl: FormControl;
  private supplierCtrl: FormControl;
  private unitPriceCtrl: FormControl;
  private postalCodeCtrl: FormControl;
  private nameCtrl: FormControl;
  private subscriptionPriceCtrl: FormControl;

  @ViewChild('dealModal')
  public dealModal: ModalDirective;

  @ViewChild('dealModalDialog')
  private dealModalDialog: any;
  private selectedFormResource: ResourceModel;

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
    this.postalCodeCtrl = this.fb.control('', Validators.required);
    this.subscriptionPriceCtrl = this.fb.control('', Validators.required);

    this.dealForm = this.fb.group({
      resource: this.resourceCtrl,
      supplier: this.supplierCtrl,
      unitPrice: this.unitPriceCtrl,
      name: this.nameCtrl,
      postalCode: this.postalCodeCtrl,
      subscriptionPrice: this.subscriptionPriceCtrl
    });
  }

  ngOnChanges() {
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
      'supplier': '',
      'postalCode': '',
      'subscriptionPrice': ''
    });
    this.selectedFormResource = null;
  }

  private hide() {
    this.dealModal.hide();
  }

  submitDeal() {
    this.deal.name = this.dealForm.value.name;
    let res: ResourceModel;
    for (res of this.resources) {
      if (res.key === this.dealForm.value.resource) {
        this.deal.resource = res;
      }
    }

    this.deal.unitPrice = this.dealForm.value.unitPrice;
    this.deal.supplier = this.dealForm.value.supplier;
    this.deal.postalCode = this.dealForm.value.postalCode;
    this.deal.subscriptionPrice = this.dealForm.value.subscriptionPrice;

    if (isNullOrUndefined(this.deal.id)) {
      this.dealService.createDeal(this.deal).subscribe(
        deal => {
          this.user.deals = this.user.deals.concat([deal]);
          this.storageService.save("user", this.user);
          this.deal = deal;
          this.dealModal.hide();
        }
      );
    } else {
      this.dealService.updateDeal(this.deal).subscribe(
        deal => {
          let dealIndex = this.user.deals.indexOf(this.deal);
          if (dealIndex !== -1) {
            this.user.deals[dealIndex] = deal;
            this.storageService.save("user", this.user);
          }
          this.deal = deal;
          this.dealModal.hide();
        }
      );
    }
  }

  render() {
    let cssClass = 'modal-conso-default';
    if(!isNullOrUndefined(this.dealForm.value.resource)) {
      cssClass = 'modal-conso-' + this.dealForm.value.resource.toLowerCase();
      if (!isNullOrUndefined(this.dealForm.value.resource) && this.dealForm.value.resource !== '') {
        this.resourceService.getResource(this.dealForm.value.resource).subscribe(
          resource => {this.selectedFormResource = resource}
        );
      }
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
    this.dealForm.setValue({
      'resource': deal.resource.key,
      'name': deal.name,
      'unitPrice': deal.unitPrice,
      'supplier': deal.supplier,
      'postalCode': deal.postalCode,
      'subscriptionPrice': deal.subscriptionPrice
    });
    this.render();
    this.dealModal.show();
  }

}
