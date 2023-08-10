import { Component, OnInit } from '@angular/core';
import { PrestamoLibros } from 'src/app/models/prestamos';
import { PrestamoMaterial } from 'src/app/models/prestamos';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { PrestamoService } from 'src/app/services/core/prestamos.service';
import { PrimeNGConfig } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';




@Component({
  selector: 'app-admin-prestamos',
  templateUrl: './admin-prestamos.component.html',
  styleUrls: ['./admin-prestamos.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminPrestamosComponent implements OnInit {

  prestamoLibroDialog: boolean = false;
  deletePrestamoLibroDialog: boolean = false;
  deletePrestamosLibrosDialog: boolean = false;
  prestamoLibros: PrestamoLibros[] = [];
  prestamoLibro: PrestamoLibros = {
    numeroBoleta: '',
    idPrestamoL: 0,
    nombre: '',
    libro_ISBN: 0,
    inicio: new Date(),
    vencimiento: new Date(),
    estado: ''


  };
  selectedPrestamoLibros: PrestamoLibros[] = [];
  submitted: boolean = false;
  selectedPrestamoLibro: PrestamoLibros[] = [];

  prestamoMaterialDialog: boolean = false;
  deletePrestamoMaterialDialog: boolean = false;
  deletePrestamosMaterialesDialog: boolean = false;
  prestamoMateriales: PrestamoMaterial[] = [];
  prestamoMaterial: PrestamoMaterial = {
    numeroBoleta: '',
    idPrestamoM: 0,
    material_id: 0,
    nombreMaterial: '',
    inicio: new Date(),
    vencimiento: new Date(),
    estado: ''
  };
  selectedPrestamoMateriales: PrestamoMaterial[] = [];
  submittedMaterial: boolean = false;
  selectedPrestamoMaterial: PrestamoMaterial[] = [];



  rowsPerPageOptions = [5, 10, 20];


  constructor(
    private messageService: MessageService,
    private prestamoService: PrestamoService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig
  ) { }

  ngOnInit() {
    this.getPrestamosLibros();
    this.getPrestramosMaterial();

    this.primengConfig.setTranslation({
      firstDayOfWeek: 1,
      dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'yy-mm-dd'
    });

  }



  getPrestamosLibros(): void {
    this.prestamoService.getPrestamosLibros().subscribe(
      (prestamos: PrestamoLibros[]) => {
        this.prestamoLibros = prestamos.map(prestamo => {
          let nuevaFechaInicio = new Date(prestamo.inicio);
          nuevaFechaInicio.setDate(nuevaFechaInicio.getDate() + 0);
          let nuevaFechaVencimiento = new Date(prestamo.vencimiento);
          nuevaFechaVencimiento.setDate(nuevaFechaVencimiento.getDate() + 0);
          return {...prestamo, inicio: nuevaFechaInicio, vencimiento: nuevaFechaVencimiento};
        }).filter(prestamo =>
          prestamo.estado === 'Correcto' || prestamo.estado === 'Multado' || prestamo.estado === 'Pagado'
        );
      },
      (error: any) => {
        console.error('Error al obtener los préstamos de libros:', error);
      }
    );
  }
  

  getPrestramosMaterial(): void {
    this.prestamoService.getPrestamosMateriales().subscribe(
      (prestamos: PrestamoMaterial[]) => {
        this.prestamoMateriales = prestamos.filter(prestamo =>
          prestamo.estado === 'Correcto' || prestamo.estado === 'Multado'
        ).map(prestamo => ({
          ...prestamo,
          inicio: new Date(new Date(prestamo.inicio).setDate(new Date(prestamo.inicio).getDate() + 0)),
          vencimiento: new Date(new Date(prestamo.vencimiento).setDate(new Date(prestamo.vencimiento).getDate() + 0)),
        }));
      },
      (error: any) => {
        console.error('Error al obtener los préstamos de materiales:', error);
      }
    );
  }


  openNew() {
    this.prestamoLibro = {
      numeroBoleta: '',
      idPrestamoL: 0,
      libro_ISBN: 0,
      nombre: '',
      inicio: new Date(),
      vencimiento: new Date(),
      estado: ''

    };
    this.submitted = false;
    this.prestamoLibroDialog = true;
  }

  openNewMaterial() {
    this.prestamoMaterial = {
      numeroBoleta: '',
      idPrestamoM: 0,
      material_id: 0,
      nombreMaterial: '',
      inicio: new Date(),
      vencimiento: new Date(),
      estado: ''
    };
    this.submittedMaterial = false;
    this.prestamoMaterialDialog = true;
  }



  showDeletePrestamosLibroDialog() {
    this.deletePrestamosLibrosDialog = true;

  }

  showDeletePrestamosMaterialesDialog() {
    this.deletePrestamosMaterialesDialog = true;

  }


  showDeletePrestamoLibroDialog(prestamoLibro: PrestamoLibros) {
    this.prestamoLibro = prestamoLibro;
    this.deletePrestamoLibroDialog = true;
  }

  showDeletePrestamoMaterialDialog(prestamoMaterial: PrestamoMaterial) {
    this.prestamoMaterial = prestamoMaterial;
    this.deletePrestamoMaterialDialog = true;
  }


  confrimDeleteSelectedPrestamoMaterial() {
    this.deletePrestamoMaterialDialog = false;
    if (!this.prestamoMaterial || !this.prestamoMaterial.idPrestamoM) {
      return;
    }

    this.prestamoService.deletePrestamoMaterial(this.prestamoMaterial.idPrestamoM, this.prestamoMaterial).toPromise().then(() => {
      this.prestamoService.getPrestamosMateriales().subscribe({
        next: (prestamos: PrestamoMaterial[]) => {
          this.prestamoMateriales = prestamos;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Préstamo desactivado',
            life: 3000
          });
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'Error al obtener los préstamos de materiales';
          console.error(errorMessage, error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: errorMessage,
            life: 3000
          });
        }
      });
    }).catch((error: HttpErrorResponse) => {
      const errorMessage = error.error.message || 'Error al desactivar el préstamo de material';
      console.error(errorMessage, error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000
      });
    });
  }

  confirmDeletePrestamoLibro() {
    this.deletePrestamoLibroDialog = false;
    if (!this.prestamoLibro || !this.prestamoLibro.idPrestamoL) {
      return;
    }
    const index = this.prestamoLibros.findIndex(
      (prestamo: PrestamoLibros) => prestamo.idPrestamoL === this.prestamoLibro.idPrestamoL
    );
    this.prestamoService.deletePrestamoLibro(this.prestamoLibro.idPrestamoL, this.prestamoLibro).toPromise().then(() => {
      this.prestamoService.getPrestamosLibros().subscribe({
        next: (prestamos: PrestamoLibros[]) => {
          this.prestamoLibros = prestamos;
          this.messageService.add({
            severity: 'success',
            summary: 'Exito',
            detail: 'Préstamo desactivado',
            life: 3000
          });
        },
        error: (error: any) => {
          console.error('Error al obtener los préstamos de libros:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al obtener los préstamos de libros',
            life: 3000
          });
        }
      });
    }).catch((error: HttpErrorResponse) => {
      const errorMessage = error.error.message || 'Error al desactivar el préstamo de libro';
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error al desactivar el préstamo de libro',
        life: 3000
      });
    });
  }

  deleteprestamoMaterial(prestamoMaterial: PrestamoMaterial) {
    this.prestamoService.deletePrestamoMaterial(prestamoMaterial.idPrestamoM, prestamoMaterial).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.prestamoMateriales = this.prestamoMateriales.filter(
            (prestamo: PrestamoMaterial) => prestamo.idPrestamoM !== prestamoMaterial.idPrestamoM
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Préstamo desactivado',
            life: 3000
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al desactivar el préstamo de material:', error);
        const errorMessage = error.error?.message || 'Error al desactivar el préstamo de material';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    );
    this.deletePrestamoMaterialDialog = false;
  }


  deletePrestamoLibro(prestamoLibro: PrestamoLibros) {
    this.prestamoService.deletePrestamoLibro(prestamoLibro.idPrestamoL, prestamoLibro).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.prestamoLibros = this.prestamoLibros.filter(
            (prestamo: PrestamoLibros) => prestamo.idPrestamoL !== prestamoLibro.idPrestamoL
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Préstamo desactivado',
            life: 3000
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error al desactivar el préstamo de libro:', error);
        const errorMessage = error.error?.message || 'Error al desactivar el préstamo de libro';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000
        });
      }
    );
    this.deletePrestamoLibroDialog = false;
  }



  hideDialog() {
    this.prestamoLibroDialog = false;
    this.submitted = false;
  }

  hideDialogMaterial() {
    this.prestamoMaterialDialog = false;
    this.submitted = false;
  }


  savePrestamoMaterial() {
    this.submittedMaterial = true;
    if (!this.prestamoMaterial.numeroBoleta?.trim() || !this.prestamoMaterial.material_id?.toString().trim()) {
      const errorMessage = !this.prestamoMaterial.numeroBoleta?.trim()
        ? 'Número de boleta inválido'
        : 'ID del material inválido';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      return;
    }

    let inicio = new Date(this.prestamoMaterial.inicio);
    inicio.setHours(inicio.getHours() + 0);
    this.prestamoMaterial.inicio = inicio;
    let vencimiento = new Date(this.prestamoMaterial.vencimiento);
    vencimiento.setHours(vencimiento.getHours() + 0);
    this.prestamoMaterial.vencimiento = vencimiento;

    if (this.prestamoMaterial.idPrestamoM) {
      const index = this.prestamoMateriales.findIndex(prestamo => prestamo.idPrestamoM === this.prestamoMaterial.idPrestamoM);
      if (index >= 0) {
        this.prestamoService.updatePrestamoMaterial(this.prestamoMaterial).subscribe((prestamoActualiczado) => {
          this.prestamoMateriales[index] = this.prestamoMaterial;
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Préstamo actualizado', life: 3000 });
          this.prestamoMaterialDialog = false;
        }, (error: any) => {
          console.error('Error al actualizar el préstamo de material:', error);
          const errorMessage = error.error.message || 'Error al actualizar el préstamo de material';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
      }
    } else {
      
      this.prestamoService.addPrestamoMaterial(this.prestamoMaterial).subscribe((prestamoGuardado) => {
        this.prestamoService.getPrestamosMateriales().subscribe((prestamosActualizados) => {
          this.prestamoMateriales = prestamosActualizados;
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Préstamo agregado', life: 3000 });
          this.prestamoMaterialDialog = false;
        }, (error: any) => {
          console.error('Error al obtener los préstamos de material actualizados:', error);
          const errorMessage = error.error.message || 'Error al obtener los préstamos de material actualizados';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
      }, (error: any) => {
        console.error('Error al agregar el préstamo de material:', error);
        const errorMessage = error.error.message || 'Error al agregar el préstamo de material';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      });

    }
  }




 /*  savePrestamoLibro() {
    this.submitted = true;
    if (this.prestamoLibro.idPrestamoL) {
      const index = this.prestamoLibros.findIndex(prestamo => prestamo.idPrestamoL === this.prestamoLibro.idPrestamoL);
      if (index >= 0) {
        const numeroBoletaExistente = this.prestamoLibros[index].numeroBoleta;
        this.prestamoLibro.numeroBoleta = numeroBoletaExistente;
        this.prestamoService.updatePrestamoLibro(this.prestamoLibro).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Préstamo actualizado',
            life: 3000
          });
          this.prestamoLibroDialog = false;
        }, (error: any) => {
          console.error('Error al actualizar el préstamo de libro:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar el préstamo de libro',
            life: 3000
          });
        });
      }
    } else {
      this.prestamoService.addPrestamoLibro(this.prestamoLibro).subscribe((prestamoGuardado) => {
        this.prestamoLibro.inicio.setHours(this.prestamoLibro.inicio.getHours() - 4);
        this.prestamoLibro.vencimiento.setHours(this.prestamoLibro.vencimiento.getHours() - 4);
        this.prestamoService.getPrestamosLibros().subscribe((prestamosActualizados) => {
          this.prestamoLibros = prestamosActualizados;
          this.messageService.add({
            severity: 'success',
            summary: 'Exitoso',
            detail: 'Préstamo agregado',
            life: 3000
          });
          this.prestamoLibroDialog = false;
        }, (error: any) => {
          console.error('Error al obtener los préstamos de libros actualizados:', error);
          const errorMessage = error.error.message || 'Error al obtener los préstamos de libros actualizados';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
      }, (error: any) => {
        console.error('Error al agregar el préstamo de libro:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al agregar el préstamo de libro',
          life: 3000
        });
      });
    }
  } */

  savePrestamoLibro() {
    this.submitted = true;
    if (this.prestamoLibro.idPrestamoL) {
        const index = this.prestamoLibros.findIndex(prestamo => prestamo.idPrestamoL === this.prestamoLibro.idPrestamoL);
        if (index >= 0) {
            const numeroBoletaExistente = this.prestamoLibros[index].numeroBoleta;
            this.prestamoLibro.numeroBoleta = numeroBoletaExistente;
            this.prestamoService.updatePrestamoLibro(this.prestamoLibro).subscribe(() => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Préstamo actualizado',
                    life: 3000
                });
                this.prestamoLibroDialog = false;
            }, (error: any) => {
                console.error('Error al actualizar el préstamo de libro:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Error al actualizar el préstamo de libro',
                    life: 3000
                });
            });
        }
    } else {
        let inicio = new Date(this.prestamoLibro.inicio);
        inicio.setDate(inicio.getDate() + 0);
        this.prestamoLibro.inicio = inicio;
        let vencimiento = new Date(this.prestamoLibro.vencimiento);
        vencimiento.setDate(vencimiento.getDate() + 0);
        this.prestamoLibro.vencimiento = vencimiento;

        this.prestamoService.addPrestamoLibro(this.prestamoLibro).subscribe((prestamoGuardado) => {
            this.prestamoService.getPrestamosLibros().subscribe((prestamosActualizados) => {
                this.prestamoLibros = prestamosActualizados;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Exitoso',
                    detail: 'Préstamo agregado',
                    life: 3000
                });
                this.prestamoLibroDialog = false;
            }, (error: any) => {
                console.error('Error al obtener los préstamos de libros actualizados:', error);
                const errorMessage = error.error.message || 'Error al obtener los préstamos de libros actualizados';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            });
        }, (error: HttpResponse<any>) => {
            console.error('Error al agregar el préstamo de libro:', error);
            const errorMessage = error.body?.message || 'Error al agregar el préstamo de libro';
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            });
        });
    }
}

  




  downloadPDFLibro() {
    this.prestamoService.getPDFPrestamosLibros().subscribe(
      (pdfBlob: Blob) => {
        const downloadURL = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'prestamos-libros-reporte.pdf';
        link.click();
      },
      (error: any) => {
        console.error('Error al descargar el PDF de préstamos de libros:', error);
        const errorMessage = error?.error?.message || 'Error al descargar el PDF de préstamos de libros';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000

        });

      }
    );
  }

  downloadPDFMaterial() {
    this.prestamoService.getPDFPrestamosMateriales().subscribe(
      (pdfBlob: Blob) => {
        const downloadURL = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'prestamos-materiales-reporte.pdf';
        link.click();
      },
      (error: any) => {

        console.error('Error al descargar el PDF de préstamos de materiales:', error);
        const errorMessage = error?.error?.message || 'Error al descargar el PDF de préstamos de materiales';
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorMessage,
          life: 3000

        });
      }
    );



  }

  convertirFechaALocal(fecha: Date): Date {
    return new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000);
  }
  

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

  


}


