import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminMaterialesRoutingModule } from './admin-materiales-routing.module';
import { AdminMaterialesComponent } from './admin-materiales.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';





@NgModule({
  declarations: [
    AdminMaterialesComponent
  ],
  imports: [
    CommonModule,
    AdminMaterialesRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    ToolbarModule,
    DialogModule

  ]
})
export class AdminMaterialesModule { }
