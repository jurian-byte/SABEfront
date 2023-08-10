import { Component, OnDestroy, Renderer2, ViewChild, OnInit, NgZone } from '@angular/core';
import { NavigationEnd, Router, Event as RouterEvent, NavigationError, NavigationStart, RouterOutlet, NavigationCancel, } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppMessagesService, errorMsg, successMsg } from 'src/app/services/utils/app.messagess.service';
import { LoadingService } from 'src/app/services/utils/loading.service';
import { LayoutService } from "../../services/layout/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {

    overlayMenuOpenSubscription: Subscription;
    menuOutsideClickListener: any;
    profileMenuOutsideClickListener: any;
    loading: boolean = false;//funciona con el interceptor de las peticiones al servidor
    loadingRouteChange: boolean = false;//asociado al cambio de rutas y a la descarga de los archivos generados por angular
    loadingSubscription: Subscription;
    messageErrorSubs: Subscription = new Subscription();
    messageSuccessSubs: Subscription = new Subscription();


    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        public loadingService: LoadingService,
        private appMessagesService: AppMessagesService,
        private ngZone: NgZone,) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target)
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (!this.profileMenuOutsideClickListener) {
                this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appTopbar.menu.nativeElement.isSameNode(event.target) || this.appTopbar.menu.nativeElement.contains(event.target)
                        || this.appTopbar.topbarMenuButton.nativeElement.isSameNode(event.target) || this.appTopbar.topbarMenuButton.nativeElement.contains(event.target));

                    if (isOutsideClicked) {
                        this.hideProfileMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }

            this.router.events.subscribe((e: RouterEvent) => {
                this.navigationInterceptor(e);
            })
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });


        //subscribcion al servicio para la barra de progreso (funciona mediante el interceptor)
        this.loadingSubscription = this.loadingService.getLoadingStatus().subscribe((value) => {
            //dependiendo de la carga de la pagina se muestra la barra de progreso
            this.loading = value;

            let p: HTMLElement | null = document.getElementById('progressbar')
            if (p)
                if (this.loading || this.loadingRouteChange)
                    p.style.visibility = 'visible';
                else
                    p.style.visibility = 'hidden';

        });

    }
    ngOnInit(): void {
        let p: HTMLElement | null = document.getElementById('progressbar')
        if (p)
            p.style.visibility = 'visible';
        //subscribcion al servicio para la barra de progreso (funciona mediante el interceptor)
        this.messageErrorSubs = this.appMessagesService.messageErrorEmit.subscribe((errorMsg: errorMsg) => {
            if (errorMsg.error) {
                switch (errorMsg.error.status) {
                    case 0: {
                        this.mensajeError('Error en la conexión', 'Revise su conexión a internet');
                        break;
                    }
                    case 400: {
                        this.mensajeError('Información incorrecta', errorMsg.error.error);
                        break;
                    }
                    case 401: {
                        this.mensajeError('Sesión', 'Sesión finalizada');
                        break;
                    }
                    case 403: {
                        this.mensajeError('No autorizado', 'Privilegios insuficientes');
                        break;
                    }
                    case 404: {
                        this.mensajeError('Recurso no encontrado', 'Privilegios insuficientes');
                        break;
                    }
                    case 504: {
                        this.mensajeError('Error en la conexión', 'Se perdió la conexión con el servidor');
                        break;
                    }
                    default:
                        this.mensajeError(errorMsg.titulo, errorMsg.mensaje);
                }
            }
            else
                this.mensajeError(errorMsg.titulo, errorMsg.mensaje);
        })
        this.messageSuccessSubs = this.appMessagesService.messageSuccesEmit.subscribe((succesMsg: successMsg) => {
            this.mensajeSuccess(succesMsg.titulo, succesMsg.mensaje);
        })
    }

    hideMenu() {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    hideProfileMenu() {
        this.layoutService.state.profileSidebarVisible = false;
        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }

        this.loadingSubscription.unsubscribe();
        this.messageErrorSubs.unsubscribe();
        this.messageSuccessSubs.unsubscribe();
    }

    navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this.loadingRouteChange = true;
        }
        if (event instanceof NavigationEnd) {
            this.loadingRouteChange = false;
        }


        // Set loading state to false in both of the below events to hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this.loadingRouteChange = false;
        }
        if (event instanceof NavigationError) {
            this.loadingRouteChange = false;
        }
    }
    /*prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }*/


    /**
    * lanza el mensaje de error

    */
    mensajeError(mensaje: string, msgAccion?: string) {
        this.ngZone.run(() => {
            alert(`Atención! ${mensaje}` + msgAccion);
        });
    }

    /**
    * lanza el mensaje  en un snackbar

    */
    mensajeSuccess(mensaje: string, msgAccion?: string) {
        this.ngZone.run(() => {

            alert(`${mensaje}` + msgAccion);
        });

    }


}
