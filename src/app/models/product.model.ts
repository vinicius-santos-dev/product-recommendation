import {Category} from "./category.model";
import {BaseModel, BaseDateModel} from "./base.model";
import {Invoice} from "./invoice.model";

export interface Product extends BaseDateModel {
  name: string;
  slug: string;
  price: number;
  image: string;
  category: Category;
}

export interface ProductParams extends Product {
  quantity: number;
}

export interface BoughtProduct extends BaseModel {
  name: string;
  price: number;
  categoryId: string;
  invoices: Invoice[];
  product: Product;
}

export interface BoughtProductParams {
  name: string;
  price: number;
  categoryId: string;
  product: { slug: string }
}
