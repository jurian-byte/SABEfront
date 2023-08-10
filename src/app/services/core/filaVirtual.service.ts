import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilaVirtualMaterial } from '../../models/filaVirtualMaterial';
import { FilaVirtualLibros } from '../../models/filaVirtualLibros';



@Injectable({
  providedIn: 'root'
})
export class FilaVirtualService {
  private apiUrlL = '/api/turnosL/usuario';
  private apiUrlM = '/api/turnosM/usuario';

  constructor(private http: HttpClient) { }

  getFilaVirtualLibro(): Observable<FilaVirtualLibros[]> {
    return this.http.get<FilaVirtualLibros[]>(this.apiUrlL);
  }
  getFilaVirtualMaterial(): Observable<FilaVirtualMaterial[]> {
    return this.http.get<FilaVirtualMaterial[]>(this.apiUrlM);
  }



  //Obterner los turnos del usuario logueado
  //Libros//
  getFilaVirtualLibroByUser(): Observable<FilaVirtualLibros> {
    return this.http.get<FilaVirtualLibros>(`/api/turnosL/usuario`);
  }
  //Materiales//
  getFilaVirtualMaterialByUser(): Observable<FilaVirtualMaterial> {
    return this.http.get<FilaVirtualMaterial>(`/api/turnosM/usuario`);
}





  hacerFilaVirtualLibro(isbn: number): Observable<any> {
    const libro = {
      libro_ISBNm: isbn.toString()

    };
    const nuevaFilaVirtualLibro = {
       libro_ISBNm: isbn.toString()
      
    };
    return this.http.post<any>(`${'/api/filaVirtualLibros'}`, nuevaFilaVirtualLibro);
  }

  
  hacerFilaVirtualMaterial(idMateriales: number): Observable<any> {
    const material = {
      material_id: idMateriales.toString()
    };
    const nuevaFilaVirtualMaterial = {
      material_id: idMateriales.toString()
    };
    return this.http.post<any>(`${'/api/filaVirtualMateriales'}`, nuevaFilaVirtualMaterial);
  }


}
