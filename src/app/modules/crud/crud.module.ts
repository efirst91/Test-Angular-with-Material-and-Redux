import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {CdkTableModule} from "@angular/cdk/table";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {NotificationsService} from "@core/services/notification/notifications.service";
import {LoadingComponentModule} from "@shared/components/loading/loading-component.module";
import {EditComponent} from './edit/edit.component';
import {CrudRoutingModule} from './crud-routing.module';
import {CrudComponent} from './crud.component';


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
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    NotificationsService
  ]
})
export class CrudModule {
}
