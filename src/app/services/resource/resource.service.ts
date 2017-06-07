import { Injectable } from '@angular/core';
import {ResourceModel} from "../../models/resource.model";
import {Observable} from "rxjs";
import {Http} from "@angular/http";
import {Config} from "../../app.config";

@Injectable()
export class ResourceService {

  constructor(private http: Http) { }

  public getResource(key: String) : Observable<ResourceModel> {
    return this.http.get(Config.getApiUrl() + '/resources/' + key)
      .map(res => res.json());
  }

  public getResources() : Observable<Array<ResourceModel>> {
    return this.http.get(Config.getApiUrl() + '/resources')
      .map(res => res.json());
  }

}
