import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = '/api/users';

  constructor(private http: HttpClient) { }


  getUsuarios() {
    return this.http.get<Usuario[]>(this.url);
  }


  getAdmins() {
    return this.http.get<Usuario[]>('/api/admins');
  }

  
  
  getUsuario() {
    return this.http.get<Usuario>(this.url);
  }


  addUsuario(usuario: Usuario): Observable<Usuario> {
      return  this.http.post<Usuario>(this.url, usuario);
     
  }
  addAdmin(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('/api/admins', usuario);
  }


  async updateUsuario(usuario: Usuario): Promise<Usuario> {
    try {
      const url = `${this.url}/${usuario.id}`;
      const response = await this.http.put<Usuario>(url, 
        {
          
          numeroBoleta: usuario.numeroBoleta,
          nombres: usuario.nombres,
          apellidoPaterno: usuario.apellidoPaterno,
          apellidoMaterno: usuario.apellidoMaterno,
          calle: usuario.calle,
          colonia: usuario.colonia,
          delegacionMunicipio: usuario.delegacionMunicipio,
          codigoPostal: usuario.codigoPostal,
          numeroExterior: usuario.numeroExterior,
          numeroInterior: usuario.numeroInterior,
          celular: usuario.celular,
          email: usuario.email,
        

        }).toPromise();
      return response ?? usuario;
    } catch (error) {
      return usuario;
    }
  }


  updateUsuariobyUser (usuario: Usuario): Observable<Usuario> {
    const url = `/api/users/update/`;
    return this.http.put<Usuario>(url, 
      {
        id: usuario.id?.toString(),
        numeroBoleta: usuario.numeroBoleta,
        nombres: usuario.nombres,
        apellidoPaterno: usuario.apellidoPaterno,
        apellidoMaterno: usuario.apellidoMaterno,
        calle: usuario.calle,
        colonia: usuario.colonia,
        delegacionMunicipio: usuario.delegacionMunicipio,
        codigoPostal: usuario.codigoPostal,
        numeroExterior: usuario.numeroExterior,
        numeroInterior: usuario.numeroInterior,
        celular: usuario.celular,
        email: usuario.email,
       

      });
  }
  

  deleteUsuario(id:number): Observable<any> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl);
  }


  deleteUsuarios(selectedUsuarios: Usuario[]): Observable<any> {
    const selectedIds = selectedUsuarios.map(usuario => usuario.id);
    const deleteUrl = `${'/api/users/multiples'}/${selectedIds.join(',')}`;
    return this.http.delete(deleteUrl);
  }


  updatePassword(id: number, newPassword: string): Observable<any> {
    const url = `/api/users/changepsswd/usuario`;
    const body = { password: newPassword }; 
    return this.http.put(url, body);
  }

  

  
}


