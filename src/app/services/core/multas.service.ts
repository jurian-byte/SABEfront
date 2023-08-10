import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Multas } from '../../models/multas';


@Injectable({
    providedIn: 'root'
})
export class MultaService {
    private apiMultasURL = '/api/multas';


    constructor(private http: HttpClient) {

    }
    
    getMultas(): Observable<Multas[]> {
        return this.http.get<Multas[]>(this.apiMultasURL).pipe(
          map((multas: Multas[]) => {
            let multasDate: Multas[] = [];
            multas.forEach(multa => {
              multa.fechagenerada = new Date(multa.fechagenerada);
              multasDate.push(multa);
            });
            return multasDate;
          })
        );
      }


      getMultasByUser(): Observable<Multas[]> {
        return this.http.get<Multas[]>(`/api/multas/usuario`).pipe(
          map((multas: Multas[]) => {
            let multasDate: Multas[] = [];
            multas.forEach(multa => {
              multa.fechagenerada = new Date(multa.fechagenerada);
              multasDate.push(multa);
            });
            return multasDate;
          })
        );
      }



      realizarPago(totalAPagar: number): Observable<any> {
        const url = 'api/create-checkout-session'; // Reemplaza con la URL de tu backend
        const payload = { 
          totalAPagar: totalAPagar.toString(),
        }; 
        return this.http.post(url, payload); 
      }


     updateMulta(multa: Multas): Observable<Multas> {
        return this.http.patch<Multas>(`/api/multiples/`, multa);
      }

      

      updateMultaByUser(): Observable<Multas> {
        return this.http.patch<Multas>(`/api/multiples/multas`, {});
      }

      

      deleteMultas(selectedMultas: Multas[]): Observable<any> {
        const selectedIds = selectedMultas.map(multa => multa.idmultas);
        const deleteUrl = `${this.apiMultasURL}/${selectedIds.join(',')}`;
        return this.http.delete(deleteUrl);
      }


      
      deleteMulta(id: number): Observable<Multas> {
        return this.http.patch<Multas>(`${'/api/multas'}/${id}`, {});
    }
    
    

      getPDFMultas(): Observable<any> {
        return this.http.get('/api/PDFMultas', { responseType: 'blob' });
      }

      getMultasAutomaticas(): Observable<Multas[]> {
        return this.http.get<Multas[]>(`/api/prueba`);
      }

      
      
}
