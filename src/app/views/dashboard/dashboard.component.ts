import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {UserModel} from "../../../models/user.model";
import {DealModalComponent} from "../../components/deal-modal/deal-modal.component";
import {ResourceService} from "../../services/resource/resource.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public user: UserModel;
  public deal: any;
  public resources;
  @ViewChild(DealModalComponent) dealModalComponent: DealModalComponent;

  constructor(
    private resourceService: ResourceService,
    private storageService: StorageService,
  ) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(
      resouces => {
        this.resources = resouces;
      }
    );

    this.user = this.storageService.read("user");
    this.deal = {
      resource: null,
      unitPrice: null,
      name: null,
      supplier: null,
      isSaved: false
    }
  }

  ngAfterViewInit() {
    // dealModal view available here
  }

  showDealModal(deal: any) {
    this.dealModalComponent.showDealModal(deal);
  }

}
