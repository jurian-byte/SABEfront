import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PrestamoLibros } from '../../models/prestamos';
import { PrestamoMaterial } from '../../models/prestamos';



@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private prestamosL = '/api/prestamosL'; // URL de la API de préstamos
  private prestamosM = '/api/prestamosM'; // URL de la API de préstamos
 //private prestamosL = 'assets/mocks/prestamosLibros.json'; // URL de la API de préstamos
  //private prestamosM= 'assets/mocks/prestamosMateriales.json'; // URL de la API de préstamos

  constructor(private http: HttpClient) { }



  
  getPrestamosLibros(): Observable<PrestamoLibros[]> {
    return this.http.get<PrestamoLibros[]>('/api/prestamosL').pipe(
      map((prestamos: PrestamoLibros[]) => {
        let prestamosDate: PrestamoLibros[] = [];
        prestamos.forEach(prestamo => {
          prestamo.inicio = new Date(prestamo.inicio);
          prestamo.vencimiento = new Date(prestamo.vencimiento);
          prestamosDate.push(prestamo);
        }
        );
        return prestamosDate;
      })

      );
  }

  getPrestamosLibrosByUser(): Observable<PrestamoLibros[]> {
    return this.http.get<PrestamoLibros[]>('/api/prestamosL/usuario').pipe(
      map((prestamos: PrestamoLibros[]) => {
        let prestamosDate: PrestamoLibros[] = [];
        prestamos.forEach(prestamo => {
          prestamo.inicio = new Date(prestamo.inicio);
          prestamo.vencimiento = new Date(prestamo.vencimiento);
          prestamosDate.push(prestamo);
        } 
        );
        return prestamosDate;
      })

      );
  }



  getPrestamosMateriales(): Observable<PrestamoMaterial[]> {
    return this.http.get<PrestamoMaterial[]>(this.prestamosM).pipe(
      map((prestamos: PrestamoMaterial[]) => {
        let prestamosDate: PrestamoMaterial[] = [];
        prestamos.forEach(prestamo => {
          prestamo.inicio = new Date(prestamo.inicio);
          prestamo.vencimiento = new Date(prestamo.vencimiento);
          prestamosDate.push(prestamo);
        });
        return prestamosDate;
      })
    );
  }

  getPrestamosMaterialesByUser(): Observable<PrestamoMaterial[]> {
    return this.http.get<PrestamoMaterial[]>('/api/prestamosM/usuario').pipe(
      map((prestamos: PrestamoMaterial[]) => {
        let prestamosDate: PrestamoMaterial[] = [];
        prestamos.forEach(prestamo => {
          prestamo.inicio = new Date(prestamo.inicio);
          prestamo.vencimiento = new Date(prestamo.vencimiento);
          prestamosDate.push(prestamo);
        });

        return prestamosDate;

      })
    );
  }

  



addPrestamoLibro(prestamo: PrestamoLibros): Observable<PrestamoLibros> {
  // Ajustar las fechas al tiempo UTC
  const inicioUTC = new Date(Date.UTC(prestamo.inicio.getFullYear(), prestamo.inicio.getMonth(), prestamo.inicio.getDate()));
  const vencimientoUTC = new Date(Date.UTC(prestamo.vencimiento.getFullYear(), prestamo.vencimiento.getMonth(), prestamo.vencimiento.getDate()));

  return this.http.post<PrestamoLibros>(this.prestamosL, {
    libro_ISBN: prestamo.libro_ISBN.toString(),
    boleta: prestamo.numeroBoleta.toString(),
    inicio: inicioUTC.toISOString(),
    vencimiento: vencimientoUTC.toISOString(),
  });
}



  addPrestamoMaterial(prestamo: PrestamoMaterial): Observable<PrestamoMaterial> {
    return this.http.post<PrestamoMaterial>(this.prestamosM,
      {
        material_id: prestamo.material_id.toString(),
        boleta: prestamo.numeroBoleta.toString(),
        inicio: prestamo.inicio.toISOString(),
        vencimiento: prestamo.vencimiento.toISOString(),



      });
  }


  updatePrestamoLibro(prestamo: PrestamoLibros): Observable<PrestamoLibros> {
    const url = `${this.prestamosL}/${prestamo.idPrestamoL}`;
    return this.http.put<PrestamoLibros>(url, prestamo);
  }

  updatePrestamoMaterial(prestamo: PrestamoMaterial): Observable<PrestamoMaterial> {
    const url = `${this.prestamosM}/${prestamo.idPrestamoM}`;
    return this.http.put<PrestamoMaterial>(url, prestamo);
  }




  deletePrestamoLibro(id: number, prestamo: PrestamoLibros): Observable<void> {
    const url = `${this.prestamosL}/${id}`;
    console.log(`Realizando solicitud PATCH a ${url}`);
    return this.http.patch<void>(url, prestamo);
  }
  

  deletePrestamoMaterial(id: number, prestamo: PrestamoMaterial): Observable<void> {
    const url = `${this.prestamosM}/${id}`;
    console.log(`Realizando solicitud PATCH a ${url}`);
    return this.http.patch<void>(url, prestamo);
  }
  



  deletePrestamosLibros(selectedPrestamos: PrestamoLibros[]): Observable<any> {
    const selectedIds = selectedPrestamos.map(prestamo => prestamo.idPrestamoL);
    const deleteUrl = `${this.prestamosL}/${selectedIds.join(',')}`;
    return this.http.delete(deleteUrl);
  }

  deletePrestamosMateriales(selectedPrestamos: PrestamoMaterial[]): Observable<any> {
    const selectedIds = selectedPrestamos.map(prestamo => prestamo.idPrestamoM);
    const deleteUrl = `${this.prestamosM}/${selectedIds.join(',')}`;
    return this.http.delete(deleteUrl);
  }
  

  getPDFPrestamosLibros(): Observable<any> {
    return this.http.get('/api/PDF', { responseType: 'blob' });
  }

  getPDFPrestamosMateriales(): Observable<any> {
    return this.http.get('/api/PDFMateriales', { responseType: 'blob' });
  }









 
}