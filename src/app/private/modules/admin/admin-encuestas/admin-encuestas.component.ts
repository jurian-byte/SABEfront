import { Component, OnInit } from '@angular/core';
import { Encuesta, Pregunta } from 'src/app/models/encuestas';
import { EncuestaService } from 'src/app/services/core/encuestas.service';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-admin-encuestas',
  templateUrl: './admin-encuestas.component.html',
  styleUrls: ['./admin-encuestas.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminEncuestasComponent implements OnInit {


  
  submitted: boolean = false;

  preguntaDialog: boolean = false;
  deletePreguntaDialog: boolean = false;
  deletePreguntasDialog: boolean = false;
  preguntas: Pregunta[] = [];
  pregunta: Pregunta = {
    idPregunta: 0,
    pregunta: '',
    rating: 0
  };
  selectedPreguntas: Pregunta[] = [];
  selectedPregunta: Pregunta[] = [];




  rowsPerPageOptions = [5, 10, 20];



  constructor(private encuestaService: EncuestaService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    
    this.getPreguntas();
  }

 

  getPreguntas(): void {
    this.encuestaService.getPreguntas().subscribe(
      (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
      },
      (error: any) => {
        console.error('Error al obtener las preguntas', error);
      }
    );
  }


  openNewPregunta(): void {
    this.pregunta = {
      idPregunta: 0,
      pregunta: '',
      rating: 0

      
    };
    this.submitted = false;
    this.preguntaDialog = true;
  }


  agregarPregunta(): void {
    const nuevaPregunta: Pregunta = {
      idPregunta: this.preguntas.length + 1,
      pregunta: '',
      rating: 0
    };
    this.preguntas.push(nuevaPregunta);
  }



  deleteSelectedPreguntas(): void {
    this.deletePreguntasDialog = false;

    const selectedIds = this.selectedPreguntas.map(pregunta => pregunta.idPregunta);

    this.encuestaService.deletePreguntas(this.selectedPreguntas)
      .subscribe(
        () => {
          this.preguntas = this.preguntas.filter(pregunta => !selectedIds.includes(pregunta.idPregunta));

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Preguntas eliminadas',
            life: 3000
          });
        },
        (error: any) => {
          console.error('Error al eliminar las preguntas:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al eliminar las preguntas',
            life: 3000
          });
        }
      );
  }


  savePregunta(): void {
    this.submitted = true;
    if (this.pregunta.idPregunta) {
      const index = this.preguntas.findIndex(pregunta => pregunta.idPregunta === this.pregunta.idPregunta);
      if (index >= 0) {
        this.encuestaService.updatePregunta(this.pregunta).subscribe(
          () => {
            this.preguntas[index] = { ...this.pregunta };
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Pregunta actualizada',
              life: 3000
            });
            this.preguntaDialog = false;
          },
          (error: any) => {
            console.error('Error al actualizar la pregunta', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al actualizar la pregunta',
              life: 3000
            });
          }
        );
      }
    } else {
      this.encuestaService.addPregunta(this.pregunta).subscribe(
        () => {
          this.encuestaService.getPreguntas().subscribe(
            (preguntas: Pregunta[]) => {
              this.preguntas = preguntas;
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Pregunta agregada',
                life: 3000
              });
              this.preguntaDialog = false;
            },
            (error: any) => {
              console.error('Error al obtener las preguntas:', error);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error al obtener las preguntas',
                life: 3000
              });
            }
          );
        },
        (error: any) => {
          console.error('Error al agregar la pregunta:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al agregar la pregunta',
            life: 3000
          });
        }
      );
    }
  }

  showDeletePreguntasDialog() {
    this.deletePreguntasDialog = true;
  }

  showDeletePreguntaDialog(pregunta: Pregunta) {
    this.pregunta = { ...pregunta };
    this.deletePreguntaDialog = true;
  }

  confirmDeleteSelectedPregunta() {
    this.deletePreguntaDialog = false;
    if (!this.pregunta || !this.pregunta.idPregunta) {
      return;
    }
    const index = this.preguntas.findIndex(
      (pregunta: Pregunta) => pregunta.idPregunta === this.pregunta.idPregunta
    );
    if (index === -1) {
      return;
    }
    this.encuestaService.deletePregunta(this.pregunta.idPregunta).toPromise().then(() => {
      this.encuestaService.getPreguntas().subscribe({
        next: (preguntas: Pregunta[]) => {
          this.preguntas = preguntas;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Pregunta eliminada',
            life: 3000
          });
        },
        error: (error: any) => {
          console.error('Error al obtener las preguntas:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al obtener las preguntas',
            life: 3000
          });
        }
      });
    }).catch((error: any) => {
      console.error('Error al eliminar la pregunta:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al eliminar la pregunta',
        life: 3000
      });
    });
  }


  deletePregunta(pregunta: Pregunta) {
    this.encuestaService.deletePregunta(pregunta.idPregunta).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.preguntas = this.preguntas.filter(
            (pregunta: Pregunta) => pregunta.idPregunta !== pregunta.idPregunta
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Pregunta eliminada',
            life: 3000
          });
        }
      },
      (error: any) => {
        console.error('Error al eliminar la pregunta:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al eliminar la pregunta',
          life: 3000
        });
      }
    );
    this.deletePreguntaDialog = false;
  }

  hideDialog() {
    this.preguntaDialog = false;
    this.submitted = false;
  }

  editPregunta(pregunta: Pregunta) {
    this.pregunta = { ...pregunta };
    this.preguntaDialog = true;
  }

  
  downloadPDFEncuesta() {
    this.encuestaService.getPDFEncuesta().subscribe((pdfBlob: Blob) => {
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Encuestas-reporte.pdf';
      link.click();
      window.URL.revokeObjectURL(url);
    }, (error) => {
      console.error('Error al obtener el PDF de la encuesta:', error);
    });
  }

  }






