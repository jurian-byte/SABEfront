import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { MaterialService } from '../../../services/core/materiales.service';
import { Material } from '../../../models/materiales';
import { FilaVirtualMaterial } from '../../../models/filaVirtualMaterial';
import { FilaVirtualService } from '../../../services/core/filaVirtual.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.scss'],
  providers: [MessageService]
})
export class MaterialesComponent implements OnInit {
  materiales: Material[] = [];
  tipoMaterial: any[] = [];

  materialesSalaEstudio: Material[] = [];
  materialesComputadoras: Material[] = [];
  materialesCubiculos: Material[] = [];
  first = 0;
  rows = 10;

  constructor(
    private materialService: MaterialService,
    private messageService: MessageService,
    private filaVirtualService: FilaVirtualService
  ) {}

  ngOnInit(): void {
    this.materialService.getMateriales().subscribe({
      next: (materiales: Material[]) => {
        this.materiales = materiales;
        this.materialesSalaEstudio = materiales.filter(m => m.Tipo === 3);
        this.materialesComputadoras = materiales.filter(m => m.Tipo === 1);
        this.materialesCubiculos = materiales.filter(m => m.Tipo === 2);
      },
      error: (error: Error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No fue posible obtener los materiales'
        });
      }
    });
  }

  
  pedirTurno(idMateriales: number): void {
    this.filaVirtualService.hacerFilaVirtualMaterial(idMateriales).subscribe(
      (filaVirtual: FilaVirtualMaterial) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: "Se obtuvo turno en la fila virtual" });
        console.log(filaVirtual);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: httpErrorResponse.error.message || "No se pudo obtener turno en la fila virtual" });
        console.error(httpErrorResponse);
      }
    );
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
  

  next(): void {
    this.first = this.first + this.rows;
  }

  prev(): void {
    this.first = this.first - this.rows;
  }

  reset(): void {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.materiales ? this.first === (this.materiales.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.materiales ? this.first === 0 : true;
  }
}
