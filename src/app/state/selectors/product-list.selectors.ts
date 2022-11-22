import {createSelector} from "@ngrx/store";
import {AppState} from "../app.state";
import {InitialCustomState} from "../interfaces/initial-state";

export const select = (state: AppState) => state.items;

export const selectProducts = createSelector(
  select,
  (state: InitialCustomState) => state.products
)
