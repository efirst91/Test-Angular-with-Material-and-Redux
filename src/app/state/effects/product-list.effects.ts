import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {ListService} from "../../core/services/list/list.service";
import {mapToResponse} from "../../core/utils/functions/response";


@Injectable()
export class MovieEffects {

  loadProducts$ = createEffect(() => this._actions$.pipe(
      ofType('[Product list] Load product list'),
      mergeMap(() => this._listService.getAllProduct()
        .pipe(
          map(response =>
            ({type: '[Product List] Product list loaded', products: mapToResponse(response)})
          ),
          catchError(() => of({type: '[Product List] Product list in not loaded'}))
        ))
    )
  );

  constructor(
    private _actions$: Actions,
    private _listService: ListService
  ) {
  }
}
