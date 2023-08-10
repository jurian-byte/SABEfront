import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { LocalStorageService, KEYS } from 'src/app/services/local-storage/local-storage.service';
@Injectable()
export class AuthGuard implements CanActivateChild, CanActivate {
    constructor(private router: Router, private storageService: LocalStorageService) { }

    canActivateChild(): boolean {
        if (this.storageService.get(KEYS.isLoggedIn) == true) {
            return true;
        }
       
        window.location.href = '/login';

        return false;
    }
    canActivate(): boolean {
        return this.canActivateChild();
    }
}
