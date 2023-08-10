import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Multas } from 'src/app/models/multas';
import { MultaService } from 'src/app/services/core/multas.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-admin-multas',
  templateUrl: './admin-multas.component.html',
  styleUrls: ['./admin-multas.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class AdminMultasComponent implements OnInit {
  searchText: string = '';
  filteredMulta: Multas[] = [];
  multaDialog: boolean = false;
  deleteMultasDialog: boolean = false;
  deleteMultaDialog: boolean = false;
  multas: Multas[] = [];
  multa: Multas = {
    numeroBoleta: '',
    idmultas: 0,
    isbn: 0,
    nombre: '',
    fechagenerada: new Date(),
    monto: 0,
    estado: 0
  };
  selectedMultas: Multas[] = [];
  submitted: boolean = false;
  selectedMulta: Multas[] = [];
  rowsPerPageOptions = [5, 10, 20];

  estadoMulta: any[] = [];




  constructor(
    private multaService: MultaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.getMultas();
    this.estadoMulta = [
      { label: 'Pagada', value: 0 },
      { label: 'Pendiente', value: 1 },

    ];
  }

  getMultas(): void {
    this.multaService.getMultas().subscribe(
      (multas: Multas[]) => {
        this.multas = multas;
        this.filterMultas();
      },
      (error: any) => {
        console.error('Error al obtener las multas:', error);
      }
    );
  }

  filterMultas(): void {
    if (!this.searchText) {
      this.filteredMulta = this.multas;
    } else {
      this.filteredMulta = this.multas.filter((multa: Multas) =>
        multa.numeroBoleta.toString().includes(this.searchText.toString())
      );
    }
  }



  deleteSelectedMultas(): void {
    this.deleteMultaDialog = false;
    if (!this.multa || !this.multa.idmultas) {
      console.error('No se ha especificado una multa para eliminar.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se ha especificado una multa para eliminar.',
        life: 3000
      });
      return;
    }
    const multaId = this.multa.idmultas;

    this.multaService.deleteMulta(multaId).subscribe(
      () => {
        // Eliminar la multa del arreglo this.multas utilizando splice
        const index = this.multas.findIndex(multa => multa.idmultas === multaId);
        if (index !== -1) {
          this.multas.splice(index, 1);
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Multa desactivada',
          life: 3000
        });

        this.multaService.getMultas().subscribe({
          next: (multas: Multas[]) => {
            this.multas = multas;
          },
          error: (error: any) => {
            console.error('Error al obtener las multas:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error al obtener las multas',
              life: 3000
            });
          }
        });
      },
      (error: any) => {
        console.error('Error al desactivar la multa:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al desactivar la multa',
          life: 3000
        });
      }
    );
  }




  showDeleteMultasDialog() {
    this.deleteMultasDialog = true;

  }

  downloadPDFMultas() {
    this.multaService.getPDFMultas().subscribe(
      (pdfBlob: Blob) => {
        const downloadURL = window.URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'multas-reporte.pdf';
        link.click();
      },
      (error: any) => {
        console.error('Error al obtener el reporte de multas:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener el reporte de multas',
          life: 3000
        });
      }
    );
  }



  showDeleteMultaDialog(multa: Multas) {
    this.multa = multa;
    this.deleteMultaDialog = true;
  }

  hideMultaDialog() {
    this.multaDialog = false;
    this.submitted = false;
  }


  multaAutomatica() {
    this.multaService.getMultasAutomaticas().subscribe(
      (multas: Multas[]) => {
        this.multas = multas;
        this.messageService.add({
          severity: 'success',
          summary: 'Exitoso',
          detail: 'Multas generadas',
          life: 3000
        });
      },
      (error: any) => {
        console.error('Error al obtener las multas:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener las multas',
          life: 3000
        });
      }
    );
  }
  



getTipoMulta(estado: number): string {
  switch (estado) {
    case 0:
      return 'Pagada';
    case 1:
      return 'Pendiente';
    default:
      return 'Desconocido';
  }
}

  
  

}
