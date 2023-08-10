import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ClientSession } from 'src/app/utils/session/session.component';
import { LayoutService } from "../../services/layout/app.layout.service";
import { LoginService } from '../../services/public/login.service';
import { HostListener } from '@angular/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./layout.component.scss']
})
export class AppTopBarComponent {

    private inactivityTimer: any;
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public clientSession: ClientSession, private router: Router, private loginService: LoginService) {

        this.items = [
            { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { this.logout() } },
            { label: 'Perfil', icon: 'pi pi-user', command: () => { this.goTo('inicio/perfil') } },
        ]
    }

    logout() {
        this.clientSession.clear();
        this.loginService.logout().subscribe(
            () => { window.location.assign('login'); }
        );

    }

    goTo(ruta: string) {
        this.router.navigate([ruta]);
    }

    resetInactivityTimer() {
        clearTimeout(this.inactivityTimer);
        this.inactivityTimer = setTimeout(() => {
            this.logout();
        }, 600000); // 600000 milisegundos = 10 minutos
    }
    @HostListener('window:mousemove')
    @HostListener('window:scroll')
    @HostListener('window:keydown')
    @HostListener('window:touchmove')
    @HostListener('window:touchstart')
    @HostListener('window:touchend')
    resetTimer() {
        this.resetInactivityTimer();
    }

}
