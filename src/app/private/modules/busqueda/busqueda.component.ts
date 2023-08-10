import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Busqueda } from '../../../models/busqueda';
import { BusquedaService } from '../../../services/core/busqueda.service';
import { FilaVirtualService } from '../../../services/core/filaVirtual.service';
import { FilaVirtualLibros } from '../../../models/filaVirtualLibros';
import { LibroService } from '../../../services/core/libros.service';
import { libros } from '../../../models/libros';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  providers: [MessageService]
})
export class BusquedaComponent implements OnInit {
  busquedaCompleta: Busqueda[] | undefined;
  resultados: Busqueda[] = [];
  listaLibros: libros[] = [];

  first = 0;
  rows = 10;
  filtro: string = '';

  constructor(private BusquedaService: BusquedaService, private messageService: MessageService, private filaVirtualService:FilaVirtualService, private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe(
      (libros: libros[]) => {
        this.listaLibros = libros;
      },
      (error: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No fue posible obtener los libros' });
      }
    );
  }
  
  

  buscar() {
    this.filtrarResultados();
  }



  filtrarResultados() {
    if (this.filtro.length > 0) {
      this.listaLibros = this.listaLibros.filter(libro =>
        (libro.nombre && libro.nombre.toLowerCase().includes(this.filtro.toLowerCase())) ||
        (libro.autor && libro.autor.toLowerCase().includes(this.filtro.toLowerCase())) ||
        (libro.isbn && libro.isbn.toString().includes(this.filtro.toLowerCase())) 
      );
    } else {
      this.libroService.getLibros().subscribe(libros => {
        this.listaLibros = libros;
      });
    }
  }
  

  
  
  

  pedirTurno(isbn: number): void {
    this.filaVirtualService.hacerFilaVirtualLibro(isbn).subscribe(
      (filaVirtual: FilaVirtualLibros) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: "Se obtuvo turno en la fila virtual" });
        console.log(filaVirtual);
      },
      (httpErrorResponse: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: httpErrorResponse.error.message || "No se pudo obtener turno en la fila virtual" });
        console.error(httpErrorResponse);
      }
    );
  }
  
  
  
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
    this.resultados = [];
  }

  isLastPage(): boolean {
    return this.resultados ? this.first === (this.resultados.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.resultados ? this.first === 0 : true;
  }
  


  

}
