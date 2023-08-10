import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  private apiUrl = '/api/User';

  constructor(private http: HttpClient) {

   }

   getUsuarioInfo() {
    return this.http.get(this.apiUrl);
   }

   updateUsuarioInfo(usuario: any) {
    return this.http.put(this.apiUrl, usuario);
   }

    updatePassword(password: any) {
    return this.http.put(this.apiUrl, password);
    }

    


}
