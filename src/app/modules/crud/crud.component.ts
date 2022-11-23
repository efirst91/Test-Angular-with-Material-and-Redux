import {Component, OnDestroy, OnInit} from '@angular/core';
import {ListService} from "../../core/services/list/list.service";
import {getTitle} from "../../core/utils/functions/response";
import {ActionsTable, Field} from "../../core/utils/enums/enums";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "./edit/edit.component";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {EditService} from "../../core/services/edit/edit.service";
import {Subject, takeUntil} from "rxjs";
import {NotificationsService} from "../../core/services/notification/notifications.service";
import {TableColumns} from "../../core/interfaces/table-columns";
import {ActionFunction, DialogDataCustom} from "../../core/interfaces/actions-functions";
import {Product} from "../../core/interfaces/product";
import {Store} from "@ngrx/store";
import {addProduct, deleteProduct, loadProducts, modifyProduct} from "../../state/actions/product-list.actions";
import {selectProducts} from "../../state/selectors/product-list.selectors";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {

  constructor(
    private _listService: ListService,
    private _editService: EditService,
    private _dialog: MatDialog,
    private _notificationService: NotificationsService,
    private _store: Store<any>
  ) {
    this.createFunctions();
  }

  public dataSource!: Product[];
  public loadingData = true;
  public displayedColumns!: string[];
  public columns!: TableColumns[];
  public Field: typeof Field = Field;
  public ActionsTable: typeof ActionsTable = ActionsTable;
  private actionFunction!: ActionFunction;

  public destroy: Subject<void> = new Subject();
  public selectedElement!: Product;

  /**
   * Action function
   * @private
   */
  private createFunctions(): void {
    this.actionFunction = {
      New: (formValue: Product, valid: boolean) => this.onAdd(formValue, valid),
      Edit: (formValue: Product, valid: boolean) => this.onEdit(formValue, valid),
      Delete: (value: string, valid: boolean) => this.onDelete(value, valid)
    }
  }


  /**
   * Set displayed columns
   * @private
   */
  private setColumns(): void {
    this.displayedColumns = ['name', 'price', 'serial_number', 'actions'];
    this.columns = [
      {
        name: 'Nombre',
        field: 'name'
      },
      {
        name: 'Precio',
        field: 'price'
      },
      {
        name: 'Numero de serie',
        field: 'serial_number'
      },
      {
        name: '',
        field: 'actions'
      }
    ]
  }

  /**
   * Delete an element from db
   * @param {String} value selected row
   * @param {Boolean} valid form valid
   */
  public onDelete(value: string, valid: boolean): void {
    if (valid && value === 'ok') {
      this.loadingData = true;
      const id = this.selectedElement.default_name as string;
      this._store.dispatch(deleteProduct({id}))
    }
  }

  /**
   * Edit selected element from db
   * @param {Product} formValue form value
   * @param {Boolean} valid form valid
   */
  public onEdit(formValue: Product, valid: boolean): void {
    if (valid) {
      this.loadingData = true;
      formValue.default_name = this.selectedElement.default_name;
      this._store.dispatch(modifyProduct({product: formValue}))
    }
  }

  /**
   * Add new element to db
   * @param {Product} formValue form value
   * @param {Boolean} valid form valid
   */
  public onAdd(formValue: Product, valid: boolean): void {
    if (valid) {
      this.loadingData = true;
      this._store.dispatch(addProduct({product: formValue}))
    }
  }

  /**
   * Get all product from store
   * @private
   */
  private storeGestions(): void {
    this._store.dispatch(loadProducts());
    this._store.select(selectProducts)
      .pipe(takeUntil(this.destroy))
      .subscribe({
          next: (products: Product[]) => {
            if (products?.length) {
              this.dataSource = products;
              this.loadingData = false;
            }
          }
        }
      )
  }

  /**
   * Update table values
   * @private
   */
  public onUpdate(): void {
    this.loadingData = true;
    this._store.dispatch(loadProducts());
  }

  /**
   * Delete all values
   */
  public deleteAll(): void {
    this.loadingData = true;
    this._store.dispatch(deleteProduct({id: 'products'}))
  }

  /**
   * Show the correct action to be executed with the modal
   * @param action current action selected from template
   * @param row selected row if needed
   */
  public onAction(action: string, row?: Product) {
    this.selectedElement = row as Product;
    const data: DialogDataCustom = {
      type: action,
      row: row ? row : null,
      title: getTitle(action),
      fn: this.actionFunction[action]
    }
    const modalConf: MatDialogConfig = {
      data,
      width: '256px'
    }
    this._dialog.open(EditComponent, modalConf)
  }

  ngOnInit(): void {
    this.storeGestions();
    this.setColumns();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
