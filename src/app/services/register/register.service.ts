import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "../../app.config";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";

@Injectable()
export class RegisterService {
  constructor(private http: Http) { }
  register(newUser) : Observable<UserModel> {
    return this.http.put(Config.apiUrl + '/register', newUser)
      .map(res => res.json());
  }
}
