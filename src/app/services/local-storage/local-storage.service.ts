import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }
    public store(key: string, value: any): void {
        this.storage.set(key, value);
    }
    public get(key: string): any {
        return this.storage.get(key);
    }
    public getOr<T>(key: string, obs: Observable<T>): Observable<T> {
        let v = this.storage.get(key);
        if (v) return of(v);
        return obs;
    }
    public remove(key: string): void {
        this.storage.remove(key);
    }
    public clear(): void {
        this.storage.clear();
    }

}

export const KEYS = Object.freeze({
    menuUsuario: 'menu_usuario',
    isLoggedIn: 'is_logged_in',
    usuario: 'usuario',
    areaUsuario: 'area',
    privilegios: 'privilegios',
    tiempoSesion: 'tiempo_sesion',
    JWT: 'JWT',

});
