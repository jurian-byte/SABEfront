import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreguntasFrecuentesRoutingModule } from './preguntas-frecuentes-routing.module';
import { AccordionModule } from 'primeng/accordion';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes.component';


@NgModule({
    declarations: [PreguntasFrecuentesComponent],
    imports: [
        CommonModule,
        PreguntasFrecuentesRoutingModule,
        AccordionModule,
    ]
})
export class PreguntasFrecuentesModule { }
