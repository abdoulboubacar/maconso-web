import {isNullOrUndefined} from "util";
import {ResourceModel} from "./resource.model";
export class DealModel {
  id: number;
  resource: ResourceModel;
  startAt: number;
  endAt: number;
  unitPrice: number;
  name: string;
  supplier: string;
  isSaved = function() : boolean {
    return !isNullOrUndefined(this.id);
  }
}

