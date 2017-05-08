import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {StorageService} from "../storage/storage.service";
import {Config} from "../../app.config";
import {UserModel} from "../../../models/user.model";

@Injectable()
export class LoginService {

  constructor(private http: Http, private storageService: StorageService) { }

  login(credentials): Observable<UserModel> {
    return this.http.post(Config.apiUrl + '/login', credentials)
      .map(res => res.json());
  }

  logout() : Observable<any> {
    return this.http.get(Config.apiUrl + '/logout')
      .map(res => res.json());
  }

}
