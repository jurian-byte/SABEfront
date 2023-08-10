import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { BusquedaComponent } from './busqueda.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import { ToastModule} from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';


@NgModule({
  declarations: [
    BusquedaComponent
  ],
  imports: [
    CommonModule,
    BusquedaRoutingModule,
    TableModule,
    ButtonModule,
    DataViewModule,
    DropdownModule,
    ToastModule,
    FormsModule,
    PaginatorModule,
    TooltipModule
  ]
})
export class BusquedaModule { }
