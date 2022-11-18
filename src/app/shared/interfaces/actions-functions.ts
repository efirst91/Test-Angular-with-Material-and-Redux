export interface ActionFunction {
  [key: string]: Function
}

export interface DialogDataCustom {
  type: string;
  title: string;
  fn: Function;
}
