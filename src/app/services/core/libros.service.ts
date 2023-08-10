import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { libros } from '../../models/libros';
@Injectable({
  providedIn: 'root'
})
export class LibroService {


  private apiUrl = '/api/libros';


  constructor(private http: HttpClient) { }
 
  getLibros() {
    return this.http.get<libros[]>(this.apiUrl);
  }

 
 addLibro(libro: libros): Observable<libros> {
  
    return this.http.post<libros>(this.apiUrl, 
      {
        ISBN: libro.isbn.toString(),
        NumEjemplar: libro.cantidad.toString(),
        Clase: libro.clase,
        SubClase: libro.subclase
      }
      );
  }
  addLibroM(libro: libros): Observable<libros> {
    return this.http.post<libros>('api/libros/manual',
      {
        ISBN: (libro.isbn ?? '').toString(),
        NumEjemplar: (libro.cantidad ?? '').toString(),
        Clase: libro.clase,
        SubClase: libro.subclase,
        Nombre: libro.nombre,
        Editorial: libro.editorial,
        Autor: libro.autor,
        Fecha: libro.fecha,
        Lenguage: libro.lenguage
      }
    );
  }
  
 
  deleteLibro(isbn: string): Observable<any> {
    const url = `${this.apiUrl}/${isbn}`;
    return this.http.delete(url);
  }


  deleteLibros(selectedLibros: libros[]): Observable<any> {
    const selectedIds = selectedLibros.map(libros => libros.isbn);
    const deleteUrl = `${this.apiUrl}/multiples/${selectedIds.join(',')}`;
    return this.http.delete(deleteUrl);
  }




  updateLibro(libro: libros): Observable<libros> {
    return this.http.put<libros>(`${this.apiUrl}/${libro.isbn}`, 
      {
        ISBN: libro.isbn.toString(),
        NumEjemplar: libro.cantidad.toString(),
        Clase: libro.clase,
        SubClase: libro.subclase,
        Nombre: libro.nombre,
        Editorial: libro.editorial,
        Autor: libro.autor,
        Fecha: libro.fecha,
        Lenguage: libro.lenguage
        
      });
  }
  
  
  
}
