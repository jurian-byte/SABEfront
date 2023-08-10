import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Material } from '../../models/materiales';
@Injectable({
    providedIn: 'root'
  })
  export class MaterialService {
   private apiUrl = '/api/materiales';

    constructor(private http: HttpClient) { }
    
   
    getMateriales(): Observable<Material[]> {
      return this.http.get<Material[]>(this.apiUrl);
    }

    

    addMaterial(material: Material): Observable<Material> {
      return this.http.post<Material>(this.apiUrl, 
        {
          Tipo: material.Tipo.toString(),
        }
        );
    }

    editMaterial(material: Material): Observable<Material> {
      return this.http.put<Material>(`${this.apiUrl}/${material.idMateriales}`, material);
    }

    deleteMaterial(id: number): Observable<Material> {
      return this.http.delete<Material>(`${this.apiUrl}/${id}`);
    }

    updateMaterial(material: Material): Observable<Material> {
      return this.http.put<Material>(`${this.apiUrl}/${material.idMateriales}`, material);
    }
    
    
    deleteMateriales(selectedMateriales: Material[]): Observable<any> {
      const selectedIds = selectedMateriales.map(material => material.idMateriales);
      const deleteUrl = `${this.apiUrl}/multiples/${selectedIds.join(',')}`;
      return this.http.delete(deleteUrl);
    }



    getPDFMateriales(): Observable<any> {
      const pdfUrl = `/api/PDFMateriales`;
      return this.http.get(pdfUrl, { responseType: 'blob' });
    }
    
  }
