import {Product} from "./product";

export interface ActionFunction {
  [key: string]: Function
}

export interface DialogDataCustom {
  type: string;
  title: string;
  row: Product | null;
  fn: Function;
}
