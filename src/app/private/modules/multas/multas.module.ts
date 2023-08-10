import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultasRoutingModule } from './multas-routing.module';
import { MultasComponent } from './multas.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CheckboxModule } from 'primeng/checkbox';
import { MultasSuccessComponent } from './multas-success/multas-success.component';
import { MultasCancelComponent } from './multas-cancel/multas-cancel.component';
import { MessageModule } from 'primeng/message';




@NgModule({
  declarations: [
    MultasComponent,
    MultasSuccessComponent,
    MultasCancelComponent
  ],
  imports: [
    CommonModule,
    MultasRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    CheckboxModule,
    MessageModule
    

  ]
})
export class MultasModule { }
