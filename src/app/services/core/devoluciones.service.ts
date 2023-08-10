import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { DevolucionesL } from '../../models/devoluciones';
import { DevolucionesM } from '../../models/devoluciones';


@Injectable({
    providedIn: 'root'
    
})
export class DevolucionService  {
    private apiDevolucionesL = '/api/prestamosL/usuario/fin';
    private apiDevolucionesM = '/api/prestamosM/usuario/fin';

    constructor(private http: HttpClient) {

    }
  
    getDevolucionesL(): Observable<DevolucionesL[]> {
        return this.http.get<DevolucionesL[]>('assets/mocks/devoluciones.json').pipe(
            map((prestamos: DevolucionesL[]) => {
              let prestamosDate: DevolucionesL[] = [];
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


      getDevolucionesM(): Observable<DevolucionesM[]> {
        return this.http.get<DevolucionesM[]>(this.apiDevolucionesM).pipe(
            map((prestamos: DevolucionesM[]) => {
              let prestamosDate: DevolucionesM[] = [];
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



}
