import {Product} from "./product.model";
import {BaseDateModel} from "./base.model";

export interface Category extends BaseDateModel {
  slug: string;
  name: string;
  products: Product[];
}
