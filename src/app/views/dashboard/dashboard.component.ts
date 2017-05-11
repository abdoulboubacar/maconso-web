import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {UserModel} from "../../../models/user.model";
import {DealModalComponent} from "../../components/deal-modal/deal-modal.component";
import {ResourceService} from "../../services/resource/resource.service";
import {DealModel} from "../../../models/deal.model";
import {ActivatedRoute} from "@angular/router";
import {StateModel} from "../../../models/state.model";
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  public user: UserModel;
  public deal: any;
  public defaultDeal = {
    resource: null,
    unitPrice: null,
    name: null,
    supplier: null,
    postalCode: null,
    isSaved: false
  }
  public resources;
  private selectedDeal: DealModel;

  @ViewChild(DealModalComponent)
  private dealModalComponent: DealModalComponent;

  @ViewChild(ChartComponent)
  private chartComponent: ChartComponent;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(
      resouces => {
        this.resources = resouces;
      }
    );

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.deal = {
      resource: null,
      unitPrice: null,
      name: null,
      supplier: null,
      postalCode: null,
      isSaved: false
    };

    this.selectedDeal = this.deal;
    if (this.user.deals.length >= 1) {
      this.deal = this.user.deals[0];
    }
  }

  ngAfterViewInit() {
    // dealModal view available here
  }

  showDealModal(deal: any) {
    this.dealModalComponent.showDealModal(deal);
  }

  loadDeal(deal: DealModel) {
    this.deal = deal;
  }

  onSaveState(state: StateModel) {
    this.chartComponent.loadChartData();
  }

}
