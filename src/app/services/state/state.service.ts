import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Config} from "../../app.config";
import {Http} from "@angular/http";
import {StateModel} from "../../models/state.model";

@Injectable()
export class StateService {

  constructor(private http: Http) { }

  public getYearData(dealId: number, year: number, unit: string) : Observable<any> {
    return this.http.get(`${Config.apiUrl}/deal/${dealId}/states/${year}/${unit}`)
      .map(res => res.json());
  }

  public createState(dealId: number, value: any) : Observable<StateModel> {
    return this.http.put(`${Config.apiUrl}/state/create/${dealId}`, value)
      .map(res => res.json());
  }

}
