import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialesRoutingModule } from './materiales-routing.module';
import { MaterialesComponent } from './materiales.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';




@NgModule({
  declarations: [
    MaterialesComponent
  ],
  imports: [
    CommonModule,
    MaterialesRoutingModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    TabViewModule,
    ToolbarModule,
    
  ]
})
export class MaterialesModule { }
