import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilaVirtualRoutingModule } from './fila-virtual-routing.module';
import { ButtonModule } from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { FilaVirtualComponent } from './fila-virtual.component';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    FilaVirtualComponent
  ],
  imports: [
    CommonModule,
    FilaVirtualRoutingModule,

    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule

  ],
  
})
export class FilaVirtualModule { }
