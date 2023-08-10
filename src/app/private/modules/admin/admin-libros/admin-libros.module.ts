import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLibrosRoutingModule } from './admin-libros-routing.module';
import { AdminLibrosComponent } from './admin-libros.component';
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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { HotTableModule } from '@handsontable/angular';

import {SelectButtonModule} from 'primeng/selectbutton';
import { registerAllModules } from 'handsontable/registry';

registerAllModules();
@NgModule({
  declarations: [
    AdminLibrosComponent

  ],
  imports: [
    CommonModule,
    AdminLibrosRoutingModule,
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
    ConfirmDialogModule,
    FormsModule,
    TooltipModule,
    HotTableModule, 
    SelectButtonModule
  ]
})
export class AdminLibrosModule { }
