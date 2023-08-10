import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioInfo } from '../../models/userInfoInicio';


@Injectable({
  providedIn: 'root'
})
export class placeholderService {

    private apiUrl = '';

    constructor(private http: HttpClient) { }
  
    getUsuarioInfo(id: number): Observable<UsuarioInfo> {
      const url = `${'http://localhost:50000/api/user'}`;
      return this.http.get<UsuarioInfo>(url);
    }
}
