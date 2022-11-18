import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActionFunction, DialogDataCustom} from "../../../shared/interfaces/actions-functions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Actions} from "../../../shared/utils/enums/enums";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(
    private _dialogRef: MatDialogRef<EditComponent>,
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataCustom,
  ) {
    this.createFunctions();
  }

  private formProduct!: FormGroup;
  private actionFunction!: ActionFunction;

  /**
   * Create action functions to be executed
   * @private
   */
  private createFunctions(): void {
    this.actionFunction = {
      New: () => this.validateNew(),
      Edit: () => this.validateModify(),
      See: () => this.validateSee(),
      Delete: () => this.validateDelete(),
    }
  }

  /**
   * Validate form when action is new
   * @private
   */
  private validateNew(): void {

  }

  /**
   * Validate form when action is modify
   * @private
   */
  private validateModify(): void {

  }

  /**
   * Validate form when action is deleted
   * @private
   */
  private validateDelete(): void {

  }

  /**
   * Validate form when action is see
   * @private
   */
  private validateSee(): void {

  }


  /**
   * Pass the form data to the function passed by reference
   * @see CrudComponent
   * @see createFunctions
   */
  public onAccept(): void {
    if (this.data.type !== Actions.DELETE) {
      this.data.fn(this.formProduct.value, this.formProduct.valid);

    } else {
      this.data.fn('ok');
    }
  }

  /**
   * Close dialog
   */
  public onClose(): void {
    this._dialogRef.close();
  }

  ngOnInit(): void {
  }

}
