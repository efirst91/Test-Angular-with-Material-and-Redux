import {Product} from "../../core/interfaces/product";

export interface InitialCustomState {
  loading: boolean;
  error: boolean;
  products: Product[];
}
