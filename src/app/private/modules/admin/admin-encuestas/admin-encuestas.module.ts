import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminEncuestasRoutingModule } from './admin-encuestas-routing.module';
import { AdminEncuestasComponent } from './admin-encuestas.component';


import {PaginatorModule} from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
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

import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AdminEncuestasComponent
  ],
  imports: [
    CommonModule,
    AdminEncuestasRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    ToolbarModule,
    DialogModule,
    CheckboxModule,
    RippleModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    RatingModule,
    RadioButtonModule,
    DropdownModule,
    InputNumberModule,
    ConfirmDialogModule
    
    
  ]
})
export class AdminEncuestasModule { }
