import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CrudRoutingModule} from './crud-routing.module';
import {CrudComponent} from './crud.component';
import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LoadingComponentModule} from "../../shared/components/loading/loading-component.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {EditComponent} from './edit/edit.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    CrudComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    MatCardModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    LoadingComponentModule,
    FlexLayoutModule,
    MatButtonModule,
    MatTableModule,
    CdkTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class CrudModule {
}
