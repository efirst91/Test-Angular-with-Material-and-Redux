import {GenericResponse} from "./api-response";

export interface ActionFunction {
  [key: string]: Function
}

export interface DialogDataCustom {
  type: string;
  title: string;
  row: GenericResponse | null;
  fn: Function;
}
