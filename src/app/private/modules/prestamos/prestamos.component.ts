import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrestamoLibros } from '../../../models/prestamos';
import { PrestamoMaterial } from '../../../models/prestamos';
import { PrestamoService } from '../../../services/core/prestamos.service';

@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.scss'],
  providers: [MessageService]
})
export class PrestamosComponent implements OnInit {
  prestamosLibros: PrestamoLibros[] = [];
  
  prestamosMaterial: PrestamoMaterial[] = [];

  first = 0;
  rows = 10;

  constructor(private prestamoService: PrestamoService, private messageService: MessageService) {}

  ngOnInit(): void {
    this.prestamoService.getPrestamosLibrosByUser().subscribe({
      next: (prestamos: PrestamoLibros[]) => {
        this.prestamosLibros = prestamos;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No fue posible obtener los prestamos' });
      }
    });

    this.prestamoService.getPrestamosMaterialesByUser().subscribe({
      next: (prestamos: PrestamoMaterial[]) => {
        this.prestamosMaterial = prestamos;
      },
      error: (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No fue posible obtener los prestamos' });
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
    return this.prestamosLibros ? this.first === this.prestamosLibros.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.prestamosLibros ? this.first === 0 : true;
  }

   
  getTipoMaterialText(tipo: number): string {
    switch (tipo) {
      case 1:
        return 'Computadora';
      case 2:
        return 'Cubículo';
      case 3:
        return 'Sala de Estudio';
      default:
        return 'Desconocido';
    }
  }
}
