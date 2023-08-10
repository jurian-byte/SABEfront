import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMultasRoutingModule } from './admin-multas-routing.module';
import { AdminMultasComponent } from './admin-multas.component';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table'; 
import {CheckboxModule }from 'primeng/checkbox';	
import {RippleModule}from 'primeng/ripple';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {RatingModule} from 'primeng/rating';
import {DialogModule }  from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';




@NgModule({
  declarations: [
    AdminMultasComponent
  ],
  imports: [
    CommonModule,
    AdminMultasRoutingModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    CheckboxModule,
    RippleModule,
    InputTextModule,
    InputTextareaModule,
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    FormsModule,
    InputNumberModule,

    RatingModule,
    RadioButtonModule



  ]
})
export class AdminMultasModule { }
