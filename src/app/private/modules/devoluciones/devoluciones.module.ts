import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolucionesRoutingModule } from './devoluciones-routing.module';
import { DevolucionesComponent } from './devoluciones.component';
import { ButtonModule } from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';


@NgModule({
  declarations: [
    DevolucionesComponent
  ],
  imports: [
    CommonModule,
    DevolucionesRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    DialogModule,
    RatingModule
  ]
})
export class DevolucionesModule { }
