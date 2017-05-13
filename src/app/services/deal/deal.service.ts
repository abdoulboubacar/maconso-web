import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {DealModel} from "../../models/deal.model";
import {Observable} from "rxjs";
import {UserModel} from "../../models/user.model";

@Injectable()
export class DealService {

  constructor(private http: Http) { }

  createDeal(deal: DealModel) : Observable<DealModel> {
    console.log(this.getData(deal));
    return this.http.put(Config.apiUrl + '/deal/create', this.getData(deal))
      .map(res => res.json());
  }

  updateDeal(deal: DealModel): Observable<DealModel> {
    return this.http.post(Config.apiUrl + '/deal/update/' + deal.id, this.getData(deal))
      .map(res => res.json());
  }

  getUserDeals(user: UserModel) : Observable<Array<DealModel>> {
    return this.http.get(Config.apiUrl + '/deals/' + user.id)
      .map(res => res.json());
  }

  getData(deal: DealModel) : any {
    console.log(deal.resource);
    return {
      id: deal.id,
      name: deal.name,
      postalCode: deal.postalCode,
      resource: deal.resource.key,
      subscriptionPrice: deal.subscriptionPrice,
      supplier: deal.supplier,
      unitPrice: deal.unitPrice
    }
  }
}
