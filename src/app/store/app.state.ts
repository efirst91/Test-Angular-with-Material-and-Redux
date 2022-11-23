import {InitialCustomState} from "./interfaces/initial-state";
import {ActionReducerMap} from "@ngrx/store";
import {productsReducer} from "./reducers/product-list.reducers";

export interface AppState {
  items: InitialCustomState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: productsReducer
}
