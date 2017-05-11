import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {DealModel} from "../../../models/deal.model";
import {Observable} from "rxjs";

@Injectable()
export class DealService {

  constructor(private http: Http) { }

  createDeal(deal: DealModel) : Observable<DealModel> {
    return this.http.put(Config.apiUrl + '/deal/create', deal)
      .map(res => res.json());
  }

  updateDeal(deal: DealModel): Observable<DealModel> {
    return this.http.post(Config.apiUrl + '/deal/update/' + deal.id, deal)
      .map(res => res.json());
  }

}
