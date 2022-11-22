import {Component, OnInit} from '@angular/core';
import {ListService} from "../../core/services/list/list.service";
import {getTitle, mapToResponse} from "../../core/utils/functions/response";
import {Field} from "../../core/utils/enums/enums";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "./edit/edit.component";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {EditService} from "../../core/services/edit/edit.service";
import {Observable, Subject} from "rxjs";
import {NotificationsService} from "../../core/services/notification/notifications.service";
import {GenericResponse} from "../../core/interfaces/api-response";
import {TableColumns} from "../../core/interfaces/table-columns";
import {ActionFunction, DialogDataCustom} from "../../core/interfaces/actions-functions";
import {Product} from "../../core/interfaces/product";
import {Store} from "@ngrx/store";
import {loadProducts} from "../../state/actions/product-list.actions";
import {selectProducts} from "../../state/selectors/product-list.selectors";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {

  constructor(
    private _listService: ListService,
    private _editService: EditService,
    private _dialog: MatDialog,
    private _notificationService: NotificationsService,
    private _store: Store<any>
  ) {
    this.createFunctions();
  }

  public dataSource!: GenericResponse[];
  public loadingData = true;
  public displayedColumns!: string[];
  public columns!: TableColumns[];
  public Field?: typeof Field;
  private actionFunction!: ActionFunction;

  public subjectAction: Subject<void> = new Subject<void>();
  public $updateTable: Observable<void> = this.subjectAction.asObservable();
  public selectedElement!: GenericResponse;

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
   * Get al products
   * @private
   */
  private getAllProducts(): void {
    this._listService.getAllProduct().subscribe(
      {
        next: response => {
          if (response !== null) {
            // this.dataSource = mapToResponse(response);
          }

          if (response === null) {
            this.dataSource = [];
          }

          this.loadingData = false;
        }
      }
    )
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
      // const id = String(this.selectedElement.product.default_name)
      // this._editService.deleteElement(id).subscribe(
      //   {
      //     next: () => {
      //       this._notificationService.openMessage('Se eliminó el producto correctamente', 'Eliminar');
      //       this.subjectAction.next();
      //     },
      //     error: () => {
      //       this._notificationService.openMessage('Error al eliminar el producto', 'Eliminar');
      //       this.loadingData = false;
      //     }
      //   }
      // )
    }
  }

  /**
   * Edit selected element from db
   * @param {Product} formValue form value
   * @param {Boolean} valid form valid
   */
  public onEdit(formValue: Product, valid: boolean): void {
    if (valid) {
      const body: GenericResponse = {
        ...this.selectedElement,
        product: formValue
      }
      this.loadingData = true;
      // this._editService.updateProduct(body).subscribe(
      //   {
      //     next: () => {
      //       this._notificationService.openMessage('Se modificó el producto correctamente', 'Modificar');
      //       this.subjectAction.next();
      //     },
      //     error: () => {
      //       this._notificationService.openMessage('Error al modificar el producto', 'Modificar');
      //       this.loadingData = false;
      //     }
      //   }
      // )
    }
  }

  /**
   * Add new element to db
   * @param {Product} formValue form value
   * @param {Boolean} valid form valid
   */
  public onAdd(formValue: Product, valid: boolean): void {
    if (valid) {
      // this.loadingData = true;
      // this._editService.addNewProduct(formValue).subscribe(
      //   {
      //     next: () => {
      //       this._notificationService.openMessage('Se adicionó el producto correctamente', 'Adicionar');
      //       this.subjectAction.next();
      //     },
      //     error: () => {
      //       this._notificationService.openMessage('Error al adicionar el producto', 'Adicionar');
      //       this.loadingData = false;
      //     }
      //   }
      // )
    }
  }


  /**
   * Subscription to the next of the subject
   * @see {Subject} subjectAction
   * @private
   */
  private subscribeToUpdate(): void {
    this.$updateTable.subscribe(
      {
        next: () => this.getAllProducts()
      }
    )
  }

  private storeGestions(): void {
    this._store.dispatch(loadProducts());
    this._store.select(selectProducts).subscribe(
      value => console.log('esto es lo que tiene un store', value)
    )
  }

  /**
   * Update table values
   * @private
   */
  public onUpdate(): void {
    this.loadingData = true;
    this.subjectAction.next();
  }

  /**
   * Delete all values
   */
  public deleteAll(): void {

  }

  /**
   * Show the correct action to be executed with the modal
   * @param action current action selected from template
   * @param row selected row if needed
   */
  public onAction(action: string, row?: GenericResponse) {
    this.selectedElement = row as GenericResponse;
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
    this.subscribeToUpdate();
    this.subjectAction.next();
    this.storeGestions();

    this.setColumns();
  }

}
