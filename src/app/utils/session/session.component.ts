import { Injectable } from '@angular/core';
import { LocalStorageService, KEYS } from 'src/app/services/local-storage/local-storage.service';
import { UsuarioLoginResponse } from '../../models/usuario';

@Injectable({
    providedIn: 'root'
})
export class ClientSession {
    constructor(private localStorageService: LocalStorageService) { }

    public clear() {
        this.localStorageService.clear();
    }

    public loginOK(session: UsuarioLoginResponse) {
        this.localStorageService.store(KEYS.isLoggedIn, true);
        this.localStorageService.store(KEYS.usuario, session.User);
        this.localStorageService.store(KEYS.JWT, session.JWT);
    }
}
