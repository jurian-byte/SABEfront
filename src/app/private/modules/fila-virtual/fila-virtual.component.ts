import { Component, OnInit } from '@angular/core';
import { FilaVirtualLibros } from '../../../models/filaVirtualLibros';
import { MessageService } from 'primeng/api';
import { FilaVirtualService } from '../../../services/core/filaVirtual.service';
import { FilaVirtualMaterial } from '../../../models/filaVirtualMaterial';

@Component({
  selector: 'app-fila-virtual',
  templateUrl: './fila-virtual.component.html',
  styleUrls: ['./fila-virtual.component.scss'],
  providers: [MessageService]
})
export class FilaVirtualComponent implements OnInit {
  filaVirtualLibros: FilaVirtualLibros[] = [
    { isbn: 0, ticketL: 0 ,},
  ];
  filaVirtualMaterial: FilaVirtualMaterial[] = [
    { id_materiales: 0, ticketM: 0 },
  ];
  tipoMaterial: any [] = [];
  first = 0;
  rows = 10;


  constructor(private FilaVirtualService: FilaVirtualService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getFilaVirtualL();
    this.getFilaVirtualM();

    this.tipoMaterial = [
      { label: 'Computadora', value: 1 },
      { label: 'Cubiculo', value: 2 },
      { label: 'Sala de estudios', value: 3 },


    ];

  }


getFilaVirtualL():void {
  this.FilaVirtualService.getFilaVirtualLibro().subscribe(
    {
      next: (filaVirtualLibros: FilaVirtualLibros[]) => {
        this.filaVirtualLibros = filaVirtualLibros;
      },
      error: (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener la fila virtual" });
      },
      complete: () => { }
    }
  );
  }



  getFilaVirtualM():void {
  this.FilaVirtualService.getFilaVirtualMaterial().subscribe(
    {
      next: (filaVirtualMaterial: FilaVirtualMaterial[]) => {
        this.filaVirtualMaterial = filaVirtualMaterial;
      }, 
      error: (error: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener la fila virtual" });
      },
      complete: () => { }
    }
  ); 
 }



 getTipoLabel(numero: number): string {
    const tipo = this.tipoMaterial.find(item => item.value === numero);
    return tipo ? tipo.label : '';
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
    return this.filaVirtualLibros ? this.first === (this.filaVirtualLibros.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.filaVirtualLibros ? this.first === 0 : true;
  }

}
