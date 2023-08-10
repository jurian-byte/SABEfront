import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DevolucionesL} from '../../../models/devoluciones';
import { DevolucionesM} from '../../../models/devoluciones';
import { DevolucionService } from '../../../services/core/devoluciones.service';
import { Encuesta, Pregunta } from 'src/app/models/encuestas';
import { EncuestaService } from 'src/app/services/core/encuestas.service';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devoluciones',
  templateUrl: './devoluciones.component.html',
  styleUrls: ['./devoluciones.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class DevolucionesComponent implements OnInit {
  devolucionesL!: DevolucionesL[];
devolucionesM!: DevolucionesM[];

displayDialogL: boolean = false;
displayDialogM: boolean = false;

respuestasCompletas: boolean = false;
submitted: boolean = false;

preguntas: Pregunta[] = [{
  idPregunta: 0,
  pregunta: '',
  rating: 0,
}];

  first = 0;
  rows = 10;

  constructor(private DevolucionService:DevolucionService, private messageService: MessageService, private encuestaService: EncuestaService, private confirmationService: ConfirmationService) {

    this.DevolucionService.getDevolucionesL().subscribe(
        {
            next: (devoluciones: any[]) => {
                this.devolucionesL = devoluciones;
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener las devoluciones de libros" });
            },
            complete: () => {}

        }
    );
   

   this.DevolucionService.getDevolucionesM().subscribe(
        {
            next: (devoluciones: any[]) => {
                this.devolucionesM = devoluciones;
            },
            error: (error: any) => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener las devoluciones de materiales" });
            },
            complete: () => {}
        }
    );
    }


    showDialog() {
      this.displayDialogL = true;
    }

    hideDialog() {
      this.displayDialogL = false;
      this.submitted = false;
    }
    
  ngOnInit() {
    this.encuestaService.getPreguntas().subscribe({
      next: (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
      }
    });
  }

  next() {
      this.first = this.first + this.rows;
  }

  prev() {
      this.first = this.first - this.rows;
  }

  reset() {
      this.first = 0;
  }

  isLastPage(): boolean {
      return this.devolucionesL ? this.first === (this.devolucionesL.length - this.rows): true;
  }

  isFirstPage(): boolean {
      return this.devolucionesL ? this.first === 0 : true;
  }

  getlabelbyTipo(tipo: string): string {
    switch (tipo) {
      case 'L':
        return 'Libro';
      case 'M':
        return 'Material';
      default:



        return 'Desconocido';
    }
  }


  enviarRespuestas(): void {
    for (const pregunta of this.preguntas) {
      const idPregunta = pregunta.idPregunta;
      const rating = pregunta.rating;
  
      this.encuestaService.enviarRespuesta(idPregunta, rating).subscribe(
        (response: any) => {
          console.log('Respuesta enviada correctamente');
  
          
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Respuesta enviada correctamente'
            
          });
        },
        (error: any) => {
          console.error('Error al enviar la respuesta', error);
  
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al enviar la respuesta'
          });
        }
      );
    }
    this.displayDialogL = false;
  }

 checkRespuestasCompletas() {
  this.respuestasCompletas = this.preguntas.every(pregunta => pregunta.rating !== null);
}

  
}
