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
  postalCode: number;
  isSaved = function (): boolean {
    return !isNullOrUndefined(this.id);
  }

  public static getDefaultDeal(): DealModel {
    let deal = new DealModel();
    deal.id = null;
    deal.resource = null;
    deal.unitPrice = null;
    deal.name = '';
    deal.supplier = '';
    deal.postalCode = null;

    return deal;
  }
}

