import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {DealModel} from "../../../models/deal.model";

@Injectable()
export class DealService {

  constructor(private http: Http) { }

  createDeal(deal: DealModel) {
    return this.http.put(Config.apiUrl + '/deal/create', deal)
      .map(res => res.json());
  }

}
