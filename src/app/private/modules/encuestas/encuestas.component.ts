import { Component, OnInit } from '@angular/core';
import { Encuesta, Pregunta } from 'src/app/models/encuestas';
import { EncuestaService } from 'src/app/services/core/encuestas.service';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.scss'],
  providers: [MessageService]
})
export class EncuestasComponent implements OnInit {
  respuestasCompletas: boolean = false;

  preguntas: Pregunta[] = [{
    idPregunta: 0,
    pregunta: '',
    rating: 0,
  }];
  



  constructor(private encuestaService: EncuestaService, private messageService: MessageService) { }

  ngOnInit(): void {
   this.encuestaService.getPreguntas().subscribe({
      next: (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
      }
    });

  }


  enviarRespuestas(): void {
    for (const pregunta of this.preguntas) {
      const idPregunta = pregunta.idPregunta;
      const rating = pregunta.rating;
  
      this.encuestaService.enviarRespuesta(idPregunta, rating).subscribe(
        (response: any) => {
          console.log('Respuesta enviada correctamente');
  
          // Muestra el mensaje de éxito al usuario
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Respuesta enviada correctamente'
            
          });
        },
        (error: any) => {
          console.error('Error al enviar la respuesta', error);
  
          // Muestra el mensaje de error al usuario
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al enviar la respuesta'
          });
        }
      );
    }
  }
  


  checkRespuestasCompletas() {
    this.respuestasCompletas = this.preguntas.every((pregunta) => pregunta.rating !== undefined);
  }
  
 


  
  

  

    

    

}
