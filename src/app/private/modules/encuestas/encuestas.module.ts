import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestasRoutingModule } from './encuestas-routing.module';
import { EncuestasComponent } from './encuestas.component';
import { ButtonModule } from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    EncuestasComponent
  ],
  imports: [
    CommonModule,
    EncuestasRoutingModule,
    ButtonModule,
    TableModule,
    PanelModule,
    RadioButtonModule,
    FormsModule,
    DialogModule,
    ToolbarModule,
    RatingModule,
    ToastModule
    
  ]
})
export class EncuestasModule { }
