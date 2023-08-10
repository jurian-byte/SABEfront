import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { libros } from 'src/app/models/libros';
import { LibroService } from 'src/app/services/core/libros.service';
import Handsontable from 'handsontable/base';
import { HotTableRegisterer } from '@handsontable/angular';
import { HttpErrorResponse } from '@angular/common/http';

import { forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-admin-libros',
  templateUrl: './admin-libros.component.html',
  styleUrls: ['./admin-libros.component.scss'],
  styles: [``],
  providers: [MessageService, ConfirmationService]
})
export class AdminLibrosComponent implements OnInit {
  errorResponse: string = '';
  filteredLibros: libros[] = [];


  searchText: string = '';

  libroDialog: boolean = false;
  libroDialogM: boolean = false;
  importarDialogM: boolean = false;
  importarDialog: boolean = false;


  deleteLibroDialog: boolean = false;

  deleteLibrosDialog: boolean = false;

  libros: libros[] = [];


  libro: libros = {
    isbn: '', nombre: '', editorial: '', autor: '', estado: '', cantidad: 0, clase: '', subclase: '',
    fecha: '', lenguage: ''
  };

  selectedLibros: libros[] = [];

  submitted: boolean = false;



  rowsPerPageOptions = [5, 10, 20];


  dataset: libros[] = [];

  private hotRegisterer = new HotTableRegisterer();

  constructor(
    private libroService: LibroService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getLibros();

  }


  getLibros(): void {
    this.libroService.getLibros().subscribe(
      (libros: libros[]) => {
        this.libros = libros;
        this.filterBooks(); // Aplicar filtrado
      },
      (error: any) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }


  filterBooks(): void {
    if (!this.searchText) {
      this.filteredLibros = this.libros;
    } else {
      this.filteredLibros = this.libros.filter((libro: libros) => {
        let searchIn = [
          libro.nombre,
          libro.autor,
          libro.isbn,

        ].join(' ').toLowerCase();

        return searchIn.includes(this.searchText.toLowerCase());
      });
    }
  }





  openNew() {
    this.libro = {
      isbn: '',
      nombre: '',
      editorial: '',
      autor: '',
      estado: '',
      cantidad: 0,
      clase: '',
      subclase: '',
      fecha: '',
      lenguage: ''


    };
    this.submitted = false;
    this.libroDialog = true;
  }

  
  deleteSelectedLibros() {
    this.deleteLibrosDialog = false;
    const selectedIds = this.selectedLibros.map(libro => libro.isbn);
    
    this.libroService.deleteLibros(this.selectedLibros).toPromise()
      .then(() => {
        this.libros = this.libros.filter(libro => !selectedIds.includes(libro.isbn));
        this.filteredLibros = this.filteredLibros.filter(libro => !selectedIds.includes(libro.isbn));
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Libros eliminados',
          life: 3000
        });
        this.selectedLibros = [];
      })
      .catch((error: HttpErrorResponse) => {
        const errorMessage = error.error.message || 'No se pudo eliminar los libros';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      });
  }
  
  




  deleteLibros(libro: libros) {
    this.libro = { ...libro };
    this.deleteLibrosDialog = true;
  }



  confirmDelete() {
    this.deleteLibroDialog = false;
    if (!this.libro || !this.libro.isbn) {
      return;
    }
  
    const index = this.libros.findIndex(libro => libro.isbn === this.libro.isbn);
  
    this.libroService.deleteLibro(this.libro.isbn).toPromise()
      .then(() => {
        if (index !== -1) {
          this.libros.splice(index, 1);
        }
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro eliminado', life: 3000 });
        this.libro = {} as libros;
      })
      .catch((error: HttpErrorResponse) => {
        const errorMessage = error.error.message || 'No se pudo eliminar el libro';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      });
  }
  


  hideDialog() {
    this.libroDialog = false;
    this.submitted = false;
  }

  hideDialogM() {
    this.libroDialogM = false;
    this.submitted = false;
  }




  /* saveLibro() {
    this.submitted = true;
    if (!this.libro.isbn) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ISBN de libro inválido', life: 3000 });
      return;
    }
    const index = this.libros.findIndex(libro => libro.isbn === this.libro.isbn);
  
    if (index >= 0) {
      this.libroService.updateLibro(this.libro).subscribe(
        (libroActualizado) => {
          this.libros[index] = this.libro;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro actualizado', life: 3000 });
          this.libroDialog = false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
          this.libroDialog = false;
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'Error al actualizar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      );
    } else {
      this.libroService.addLibro(this.libro).subscribe(
        (libroGuardado) => {
         // this.recargarPagina();
          this.libros.unshift(libroGuardado);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro agregado', life: 3000 });
          this.libroDialog = false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
          this.libroDialog = false;
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'Error al agregar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      );
    }
  } */
  

  saveLibro() {
    this.submitted = true;

    if (!this.libro || !this.libro.isbn) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ISBN de libro inválido', life: 3000 });
        return;
    }

    // Inicializamos this.libros como un array vacío si es null o undefined
    this.libros = this.libros || [];

    const index = this.libros.findIndex(libro => libro.isbn === this.libro.isbn);

    if (index >= 0) {
        this.libroService.updateLibro(this.libro).subscribe(
            (libroActualizado) => {
                this.libros[index] = this.libro;
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro actualizado', life: 3000 });
                this.libroDialog = false;
            },
            (error: HttpErrorResponse) => {
                const errorMessage = error.error.message || 'Error al actualizar el libro';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            }
        );
    } else {
        this.libroService.addLibro(this.libro).subscribe(
            (libroGuardado) => {
                this.libros.unshift(libroGuardado);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro agregado', life: 3000 });
                this.libroDialog = false;
            },
            (error: HttpErrorResponse) => {
                const errorMessage = error.error.message || 'Error al agregar el libro';
                this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
            }
        );
    }
}




  saveLibroM() {
    this.submitted = true;
    if (!this.libro.isbn) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ISBN de libro inválido', life: 3000 });
      return;
    }
  
    const index = this.libros.findIndex(libro => libro.isbn === this.libro.isbn);
  
    if (index >= 0) {
      this.libroService.updateLibro(this.libro).subscribe(
        () => {
          this.libros[index] = this.libro;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro actualizado', life: 3000 });
          this.libroDialogM= false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
          this.libroDialogM = false;
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'Error al actualizar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      );
    } else {
      this.libroService.addLibroM(this.libro).subscribe(
        () => {
          this.libros.unshift(this.libro);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Libro agregado', life: 3000 });
          this.libroDialogM = false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
          this.libroDialogM = false;
        },
        (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'Error al agregar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      );
    }
  }
  



  editLibro(libro: libros) {
    this.libro = { ...libro };
    this.libroDialogM = true;
  }



  showDeleteLibrosDialog() {
    this.deleteLibrosDialog = true;
  }


  showDeleteLibroDialog(libro: libros) {
    this.libro = libro;
    this.deleteLibroDialog = true;
  }

  showLibroDialogM() {
    this.libroDialogM = true;
    this.libroDialog = false;
  }


 


  confirmDeleteSelectedLibro() {
    this.deleteLibrosDialog = false;
    if (!this.libro || !this.libro.isbn) {
      return;
    }
    const isbn = this.libro.isbn;
    const index = this.libros.findIndex((libro: libros) => libro.isbn === isbn);
  
    if (index !== -1) {
      this.libroService.deleteLibro(isbn).toPromise()
        .then(() => {
          this.libros.splice(index, 1); 
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Libro eliminado',
            life: 3000
          });
        })
        .catch((error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'No se pudo eliminar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
    }
  }
  





 
  
  guardarImport() {
    let arrayLibros = this.hotRegisterer.getInstance('hotlibros').getData();
    let libros: libros[] = [];
    
    for (let i = 0; i < arrayLibros.length-1; i++) {
      let libro: libros = {
        isbn: arrayLibros[i][0],
        nombre: arrayLibros[i][1],
        editorial: arrayLibros[i][2],
        autor: arrayLibros[i][3],
        cantidad: arrayLibros[i][4],
        clase: arrayLibros[i][5],
        subclase: arrayLibros[i][6],
        fecha: arrayLibros[i][7],
        lenguage: arrayLibros[i][8],
        estado: 'Disponible'
      }
      libros.push(libro);
    }
    
    for (let i = 0; i < libros.length; i++) {
      this.libroService.addLibroM(libros[i]).subscribe({
        next: (libroCreado) => { 
          if (libroCreado) {
            this.libros.unshift(libroCreado);
          } else {
          }
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Libro agregado', life: 3000 });
          this.libroDialog = false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
        }, 
        error: (error: any) => {
          const errorMessage = error.error.message ? error.error.message : 'Error al agregar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      });
      
    }
    //let observables = libros.map(libro => this.libroService.addLibroM(libro));
  
    //forkJoin(observables).pipe(
      //tap(() => {
        //this.libros.unshift(...libros);
      //})
    //).subscribe({
     /*  next: () => {
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Libros agregados', life: 3000 });
        this.importarDialogM = false;
      },
      error: (error: any) => {
        const errorMessage = error.error.message ? error.error.message : 'Error al agregar los libros';
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
      }
    }); */
    
  }
  


  guardarImporAPI() {
    let arrayLibros = this.hotRegisterer.getInstance('hotlibrosM').getData()
    let libros: libros[] = [];
    for (let i = 0; i < arrayLibros.length-1; i++) {
      let libro: libros = {
        isbn: arrayLibros[i][0],
        nombre: "",
        editorial: "",
        autor: "",
        cantidad: arrayLibros[i][1],
        clase: arrayLibros[i][2],
        subclase: arrayLibros[i][3],
        fecha: "",
        lenguage: "",
        estado: 'Disponible'
      }
      libros.push(libro);
    }
    for (let i = 0; i < libros.length; i++) {
      this.libroService.addLibro(libros[i]).subscribe({
        next: (libroCreado) => { 
          if (libroCreado) {
            this.libros.unshift(libroCreado);
          } else {
          }
          this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Libro agregado', life: 3000 });
          this.libroDialog = false;
          this.libro = {
            isbn: '',
            nombre: '',
            editorial: '',
            autor: '',
            estado: '',
            cantidad: 0,
            clase: '',
            subclase: '',
            fecha: '',
            lenguage: ''
          };
        }, 
        error: (error: any) => {
          const errorMessage = error.error.message ? error.error.message : 'Error al agregar el libro';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      });
    }
    this.importarDialog = false;
  }
  



/*   recargarPagina(): void {
    window.location.reload();
  } */





}


