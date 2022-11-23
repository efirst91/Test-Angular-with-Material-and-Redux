import {createReducer, on} from "@ngrx/store";
import {InitialCustomState} from "../interfaces/initial-state";
import * as ProductListActions from '../actions/product-list.actions';

export const initialState: InitialCustomState = {
  loading: false,
  error: false,
  value: null,
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
  }),
  on(ProductListActions.addProduct, (state, {product}) => {
    return {...state, loading: true, products: [...state.products, product]}
  }),
  on(ProductListActions.addProductOk, (state, {value}) => {
    return {...state, loading: false, value, error: false}
  }),
  on(ProductListActions.addingProductKo, (state, {error}) => {
    return {...state, loading: false, error}
  }),
  on(ProductListActions.modifyProduct, (state, {product}) => {
    const indexToModify = state.products.findIndex(oldProduct => oldProduct.default_name === product.default_name);
    const productsCopy = [...state.products];
    productsCopy[indexToModify] = product;
    return {...state, loading: true, products: [...productsCopy]}
  }),
  on(ProductListActions.modifyProductOk, (state, {product}) => {
    return {...state, loading: false, error: false, product}
  }),
  on(ProductListActions.modifyProductKo, (state) => {
    return {...state, loading: false, error: true}
  }),
  on(ProductListActions.deleteProduct, (state, {id}) => {
    const indexToDelete = state.products.findIndex(oldProduct => oldProduct.default_name === id);
    const resulArray = [...state.products];
    resulArray.splice(indexToDelete, 1);
    return {...state, loading: true, products: [...resulArray]}
  }),
  on(ProductListActions.deleteProductOk, (state) => {
    return {...state, loading: false, error: false}
  }),
  on(ProductListActions.deleteProductKo, (state) => {
    return {...state, loading: false, error: true}
  }),
)
