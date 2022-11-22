import {createReducer, on} from "@ngrx/store";
import {InitialCustomState} from "../interfaces/initial-state";
import * as ProductListActions from '../actions/product-list.actions';

export const initialState: InitialCustomState = {
  loading: false,
  error: false,
  products: []
}

export const productsReducer = createReducer(
  initialState,
  on(ProductListActions.loadProducts, (state) => {
    return {...state, loading: true}
  }),
  on(ProductListActions.loadedProducts, (state, {products}) => {
    return {...state, loading: false, products}
  }),
  on(ProductListActions.loadErrorProducts, (state) => {
    return {...state, loading: false, error: true}
  })
)
