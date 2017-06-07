import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {StorageService} from "../../services/storage/storage.service";
import {UserModel} from "../../models/user.model";
import {DealModalComponent} from "../../components/deal-modal/deal-modal.component";
import {ResourceService} from "../../services/resource/resource.service";
import {DealModel} from "../../models/deal.model";
import {ActivatedRoute} from "@angular/router";
import {StateModel} from "../../models/state.model";
import {ChartComponent} from "../../components/chart/chart.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public user: UserModel;
  public deal: DealModel = DealModel.getDefaultDeal();
  public defaultDeal: DealModel = DealModel.getDefaultDeal();
  public resources;
  private selectedDeal: DealModel;

  @ViewChild(DealModalComponent)
  private dealModalComponent: DealModalComponent;

  @ViewChild(ChartComponent)
  private chartComponent: ChartComponent;

  constructor(
    private resourceService: ResourceService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(
      resources => {
        this.resources = resources;
      }
    );

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.selectedDeal = this.deal;
    if (this.user.deals.length >= 1) {
      this.deal = this.user.deals.reverse()[0];
    }
  }

  showDealModal(deal: DealModel) {
    this.dealModalComponent.showDealModal(deal);
  }

  loadDeal(deal: DealModel) {
    this.deal = deal;
  }

  onSaveState(state: StateModel) {
    this.chartComponent.loadChartData();
    this.deal.lastState = state;
    this.storageService.save("user", this.user);
  }

}
