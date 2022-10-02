import {BaseModel} from "./base.model";
import {Invoice} from "./invoice.model";


export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface User extends BaseModel {
  gender: Gender;
  cpf: string;
  name: string;
  datasetId: number;
  invoices: Invoice[];
}
