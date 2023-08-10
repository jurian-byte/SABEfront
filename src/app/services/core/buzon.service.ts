import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BuzonService {

    constructor(private http: HttpClient) { }

    getUsuariosSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    getUsuarios() {
        return this.http.get<any>('assets/demo/data/products.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    getUsuariosMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }

    getUsuariosWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as any[])
            .then(data => data);
    }
}
