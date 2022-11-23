import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ListService} from "../../core/services/list/list.service";
import {mapToResponse} from "../../core/utils/functions/response";
import {EditService} from "../../core/services/edit/edit.service";
import * as ProductListActions from '../actions/product-list.actions';


@Injectable()
export class MovieEffects {

  loadProducts$ = createEffect(() => this._actions$.pipe(
      ofType(ProductListActions.loadProducts),
      mergeMap(() => this._listService.getAllProduct()
        .pipe(
          map(response =>
            (ProductListActions.loadedProducts({products: mapToResponse(response)}))
          ),
          catchError(() => of(ProductListActions.loadErrorProducts))
        ))
    )
  );

  addingProduct$ = createEffect(() => this._actions$.pipe(
      ofType(ProductListActions.addProduct),
      mergeMap((newItem) => this._editService.addNewProduct(newItem['product'])
        .pipe(
          map(value =>
            (ProductListActions.addProductOk({value}))
          ),
          catchError(() => of(ProductListActions.addingProductKo))
        ))
    )
  );

  modifyingProduct$ = createEffect(() => this._actions$.pipe(
      ofType(ProductListActions.modifyProduct),
      mergeMap((newItem) => this._editService.updateProduct(newItem['product'])
        .pipe(
          map((product) =>
            (ProductListActions.modifyProductOk({product}))
          ),
          catchError(() => of(ProductListActions.modifyProductKo))
        ))
    )
  );

  deleteProduct$ = createEffect(() => this._actions$.pipe(
      ofType(ProductListActions.deleteProduct),
      mergeMap((newItem) => this._editService.deleteElement(newItem['id'])
        .pipe(
          map(() =>
            (ProductListActions.deleteProductOk())
          ),
          catchError(() => of(ProductListActions.deleteProductKo))
        ))
    )
  );

  constructor(
    private _actions$: Actions,
    private _listService: ListService,
    private _editService: EditService
  ) {
  }
}
