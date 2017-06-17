import { Component, OnInit } from '@angular/core';
import {ResourceService} from "../../services/resource/resource.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  private resources;

  private plan1 = {
    name: "Standard",
    price: 1.99,
    multi: false,
    auto: false,
    options: {
      ELECTRICITY: 1,
      GAS: 1,
      WATTER: 1
    }
  };

  private plan2 = {
    name: "Multi",
    multi: true,
    auto: false,
    price: 4.99,
    options: {
      ELECTRICITY: 4,
      GAS: 4,
      WATTER: 4
    }
  };

  private plan3 = {
    name: "Premium",
    price: 6.99,
    multi: false,
    auto: true,
    options: {
      ELECTRICITY: 1,
      GAS: 1,
      WATTER: 1
    }
  };

  private current;

  private plans:Array<any> = [
    this.plan1, this.plan2, this.plan3
  ]

  constructor(
    private resourceService: ResourceService
  ) { }

  ngOnInit() {
    this.resourceService.getResources().subscribe(
      resources => {
        this.resources = resources;
      }
    );
    this.current = this.plan1;
  }

  changePlan(plan:any) {
    this.current = plan;
  }

}
