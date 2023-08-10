import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPrestamosRoutingModule } from './admin-prestamos-routing.module';
import { AdminPrestamosComponent } from './admin-prestamos.component';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import {PaginatorModule} from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import {CheckboxModule }from 'primeng/checkbox';	
import {RippleModule}from 'primeng/ripple';
import {FileUploadModule }  from 'primeng/fileupload';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { registerLocaleData } from '@angular/common';









@NgModule({
  declarations: [
    AdminPrestamosComponent
  ],
  imports: [
    CommonModule,
    AdminPrestamosRoutingModule,
    ButtonModule,
    TableModule,
    PanelModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
    ToolbarModule,
    RatingModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    ConfirmDialogModule,
    CalendarModule,
    CheckboxModule,
    RippleModule,
    FileUploadModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,

    
  
    


  ]
})
export class AdminPrestamosModule { }
