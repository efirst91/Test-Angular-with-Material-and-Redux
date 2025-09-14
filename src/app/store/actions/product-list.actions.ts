import {createAction, props} from "@ngrx/store";
import {Product} from "@core/interfaces/product";

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
  '[Product] Adding product',
  props<{ product: Product }>()
)

export const addProductOk = createAction(
  '[Product] Product has been added',
  props<{ value: string | null, error: boolean }>()
)

export const addingProductKo = createAction(
  '[Product] An error has occurred when add product'
)

export const modifyProduct = createAction(
  '[Product] Modifying product',
  props<{ product: Product }>()
)

export const modifyProductOk = createAction(
  '[Product] Product has been modified',
  props<{ product: Product }>()
)

export const modifyProductKo = createAction(
  '[Product] An error has occurred when modifying product '
)

export const deleteProduct = createAction(
  '[Product] Deleting product',
  props<{ id: string }>()
)

export const deleteProductOk = createAction(
  '[Product] Product has been deleted',
)

export const deleteProductKo = createAction(
  '[Product] An error has occurred when delete a product'
)
