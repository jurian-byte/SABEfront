import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamosRoutingModule } from './prestamos-routing.module';
import { PrestamosComponent } from './prestamos.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';



@NgModule({
  declarations: [
    PrestamosComponent
  ],
  imports: [
    CommonModule,
    PrestamosRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule

  ]
})
export class PrestamosModule { }
