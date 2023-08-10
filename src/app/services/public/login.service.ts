import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, UsuarioLoginResponse } from '../../models/usuario';
import { usuarioInfo } from '../../models/usuario';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }


    login(email: string, password: string): Observable<UsuarioLoginResponse> {
        //return this.http.get<UsuarioLoginResponse>('assets/mocks/login.json');
        return this.http.post<UsuarioLoginResponse>('/api/login', {
            'email': email,
            'password': password
        }, httpOptions);

    }

    requestPasswordReset(email: string): Observable<any> {
        //return of(true)
        return this.http.post('/api/restore', {
            "email": email,
        })
    }

    resetPassword(email: string, password: string): Observable<Usuario> {
        return this.http.post<Usuario>('/api/restore', {
            "email": email,
            "password": password,
        })
    }

    logout() {
        return this.http.post('/api/logout', {}, httpOptions);
    }

    getinfoUser(): Observable<usuarioInfo> {
        return this.http.get<usuarioInfo>('/api/User');
    }


}
