import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario, usuarioInfo} from '../../../models/usuario';
import { LoginService } from '../../../services/public/login.service';
import { MessageService } from 'primeng/api';
import {  Pregunta } from 'src/app/models/encuestas';
import { EncuestaService } from 'src/app/services/core/encuestas.service';
import { ConfirmationService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
  providers: [MessageService, ConfirmationService,DialogModule]
})
export class PlaceholderComponent implements OnInit {
  usuarioInfo: usuarioInfo = {
    multas: 0,
    prestamosActivos: 0,
    prestamosFinalizados: 0,
    turnosActivos: 0,
    user: {
    id : 0,
    numeroBoleta  : '',
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    calle: '',
    colonia: '',
    delegacionMunicipio: '',
    codigoPostal: '',
    numeroExterior: '',
    numeroInterior: '',
    celular: '',
    email: '',
    password: '',
    password_confirm: '',
    role_id: '',
    }
     
  };

displayDialogL: boolean = false;
respuestasCompletas: boolean = false;
submitted: boolean = false;


preguntas: Pregunta[] = [{
  idPregunta: 0,
  pregunta: '',
  rating: 0,
}];

  first = 0;
  rows = 10;

 
  constructor(
    
    private router: Router,
    private loginService: LoginService, 
    private messageService: MessageService,
    private encuestaService: EncuestaService,
    private changeDetectorRef: ChangeDetectorRef,
   

  ) {


  }

  ngOnInit(): void {
    this.getUsuarioInfo();

    this.encuestaService.getPreguntas().subscribe({
      next: (preguntas: Pregunta[]) => {
        this.preguntas = preguntas;
      }
    });
    
   
  }

  getUsuarioInfo() {
    this.loginService.getinfoUser().subscribe({
      next: (response) => {
        this.usuarioInfo = response;
        if (this.usuarioInfo.prestamosFinalizados > 0) {
          this.showDialog();
          this.changeDetectorRef.detectChanges();
        }
      }
    });
  }
  
  

  showDialog() {
    if (this.preguntas.length > 0) {
      this.displayDialogL = true;
    } else {
      this.displayDialogL = false;
    }
    console.log(this.displayDialogL);
  }
  


  hideDialog() {
    this.displayDialogL = false;
    this.submitted = false;
  }
  
  navigateTo(section: string) {
    switch (section) {
      case 'prestamos':
        this.router.navigate(['/prestamos']);
        break;
      case 'multas':
        this.router.navigate(['/multas']);
        break;
      case 'devoluciones':
        this.router.navigate(['/devoluciones']);
        break;
      case 'turnoVirtual':
        this.router.navigate(['/fila-virtual']);
        break;
      default:
        console.log(`Sección desconocida: ${section}`);
        break;
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

displayDialog():boolean {
  return this.displayDialogL && this.preguntas.length > 0;
}
}
