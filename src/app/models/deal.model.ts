import {isNullOrUndefined} from "util";
import {ResourceModel} from "./resource.model";
import {StateModel} from "./state.model";
export class DealModel {
  id: number;
  resource: ResourceModel;
  startAt: number;
  endAt: number;
  unitPrice: number;
  name: string;
  supplier: string;
  postalCode: number;
  subscriptionPrice:number;
  states: Array<StateModel>;
  lastState: StateModel;
  isSaved = function (): boolean {
    return !isNullOrUndefined(this.id);
  }

  public static getDefaultDeal(): DealModel {
    let deal = new DealModel();
    deal.id = null;
    deal.resource = ResourceModel.getDeaultResource();
    deal.unitPrice = null;
    deal.name = '';
    deal.supplier = '';
    deal.postalCode = null;
    deal.subscriptionPrice = null;
    deal.states = [];
    deal.lastState = null;

    return deal;
  }
}

