import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {StorageService} from "../../services/storage/storage.service";
import {UserModel} from "../../../models/user.model";
@Injectable()
export class UserResolver implements Resolve<UserModel> {
  constructor(private storageService: StorageService) {
  }

  resolve(route: ActivatedRouteSnapshot) : UserModel {
    let user = this.storageService.read('user');
    if (user === null) {
      user = UserModel.getAnonymousUser();
    }
    return user;
  }
}
