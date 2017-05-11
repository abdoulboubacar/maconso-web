import {DealModel} from "./deal.model";
import {isNullOrUndefined} from "util";
export class UserModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  deals: Array<DealModel>;
  accessToken: string;

  public isAnonymous() : boolean {
    return isNullOrUndefined(this.id);
  }

  public static getAnonymousUser() : UserModel {
    let user = new UserModel();
    user.id = null;
    user.firstName = '';
    user.lastName = '';
    user.email = '';
    user.deals = [];
    user.accessToken = '';
    user.isAnonymous = (function() {
      return isNullOrUndefined(this.id);
    });

    return user;
  }
}
