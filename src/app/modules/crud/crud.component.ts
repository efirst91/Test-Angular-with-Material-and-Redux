import {Component, OnInit} from '@angular/core';
import {ListService} from "../../shared/services/list/list.service";
import {GenericResponse} from "../../shared/interfaces/api-response";
import {mapToResponse} from "../../shared/utils/functions/response";
import {TableColumns} from "../../shared/interfaces/table-columns";
import {Field} from "../../shared/utils/enums/enums";
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "./edit/edit.component";
import {MatDialogConfig} from "@angular/material/dialog/dialog-config";
import {ActionFunction, DialogDataCustom} from "../../shared/interfaces/actions-functions";
import {Product} from "../../shared/interfaces/product";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  constructor(
    private _listService: ListService,
    private _dialog: MatDialog
  ) {
    this.createFunctions();
  }

  public dataSource!: GenericResponse[];
  public loadingData = true;
  public displayedColumns!: string[];
  public columns!: TableColumns[];
  public Field?: typeof Field;
  private actionFunction!: ActionFunction;

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
          this.dataSource = mapToResponse(response);
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
        name: 'Acciones',
        field: 'actions'
      }
    ]
  }

  /**
   * Delete an element from db
   * @param row selected row
   */
  public onDelete(value: string, valid: boolean): void {

  }

  /**
   * Edit selected element from db
   * @param row selected row
   */
  public onEdit(formValue: Product, valid: boolean): void {

  }

  /**
   * Add new element to db
   */
  public onAdd(formValue: Product, valid: boolean): void {
    // const dialogConf: MatDialogConfig = {
    //   width:
    // }
    // this._dialog.open(EditComponent, {
    //   i
    // })
  }

  /**
   * Get correct title for dialog
   * @param action action to be executed
   * @private
   */
  private getTitle(action: string): string {
    const titles: ActionFunction = {
      New: () => 'Nuevo producto',
      Edit: () => 'Modificar producto',
      Delete: () => 'Eliminar producto'
    }

    return titles[action]();
  }

  /**
   * Show the correct action to be executed with the modal
   * @param action current action selected from template
   * @param row selected row if needed
   */
  public onAction(action: string, row?: GenericResponse) {
    const data: DialogDataCustom = {
      type: action,
      title: this.getTitle(action),
      fn: this.actionFunction[action]
    }
    const modalConf: MatDialogConfig = {
      data,
      width: '256px'
    }
    this._dialog.open(EditComponent, modalConf)
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.setColumns();
  }

}
