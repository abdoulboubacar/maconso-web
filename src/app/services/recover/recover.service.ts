import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class RecoverService {
  constructor(private http: Http) { }
  recover(updatedUser) : Observable<UserModel> {
    return this.http.put(Config.apiUrl + '/recover', updatedUser)
      .map(res => res.json());
  }
}
