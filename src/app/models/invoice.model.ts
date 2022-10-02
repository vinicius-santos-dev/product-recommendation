import {BaseModel} from "./base.model";
import {BoughtProduct, BoughtProductParams} from "./product.model";
import {User} from "./user.model";

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  TRANSFER = 'TRANSFER',
}

export interface Invoice extends BaseModel {
  total: number;
  paymentMethod: PaymentMethod;
  rating: number;
  buyer: User;
  products: BoughtProduct[];
}


export interface InvoiceParams {
  total: number;
  paymentMethod: PaymentMethod;
  rating?: number;
  buyer?: number;
  products?: BoughtProductParams[];
}
