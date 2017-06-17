import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class AskRecoverService {
  constructor(private http: Http) { }
  askrecover(emailUser) : Observable<UserModel> {
    return this.http.put(Config.apiUrl + '/askrecover', emailUser)
      .map(res => res.json());
  }
}
