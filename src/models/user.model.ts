import {DealModel} from "./deal.model";
import {isNullOrUndefined} from "util";
export class UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  deals: Array<DealModel>;
  accessToken: string;

  isAnonymous = function() : boolean {
    return isNullOrUndefined(this.accessToken);
  }
}
