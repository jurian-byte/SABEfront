import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperAdminAdminsRoutingModule } from './super-admin-admins-routing.module';
import { SuperAdminAdminsComponent } from './super-admin-admins.component';

import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table'; 
import {CheckboxModule }from 'primeng/checkbox';	
import {RippleModule}from 'primeng/ripple';
import {FileUploadModule }  from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RatingModule} from 'primeng/rating';
import {DialogModule }  from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    SuperAdminAdminsComponent
  ],
  imports: [
    CommonModule,
    SuperAdminAdminsRoutingModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    RippleModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    RatingModule,
    DialogModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    ConfirmDialogModule


  ]
})
export class SuperAdminAdminsModule { }
