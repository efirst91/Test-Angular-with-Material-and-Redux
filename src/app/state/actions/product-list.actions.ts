import {createAction, props} from "@ngrx/store";
import {Product} from "../../core/interfaces/product";

export const loadProducts = createAction(
  '[Product list] Load product list'
);

export const loadedProducts = createAction(
  '[Product List] Product list loaded',
  props<{ products: Product[] }>()
)

export const loadErrorProducts = createAction(
  '[Product List] Product list in not loaded'
)

export const addProduct = createAction(
  '[Product] Product has been added',
  props<{ product: Product }>()
)

export const addingProductError = createAction(
  '[Product] An error has occurred when add product'
)

export const modifyProduct = createAction(
  '[Product] Product has been modified',
  props<{ product: Product }>()
)

export const modifyProductError = createAction(
  '[Product] An error has occurred when modifying product '
)

export const deleteProduct = createAction(
  '[Product] Product has been deleted',
  props<{ id: string }>()
)

export const deleteProductError = createAction(
  '[Product] An error has occurred when delete a product'
)
