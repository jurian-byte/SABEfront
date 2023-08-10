import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout/app.layout.service';
import { LoginService } from '../../services/public/login.service';
import { usuarioInfo } from '../../models/usuario';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    usuario: usuarioInfo = {
        multas: 0,
        prestamosActivos: 0,
        prestamosFinalizados: 0,
        turnosActivos: 0,
        user: {
            id: 0,
            numeroBoleta: '',
            nombres: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            calle: '',
            colonia: '',
            delegacionMunicipio: '',
            codigoPostal: '',
            numeroExterior: '',
            numeroInterior: '',
            celular: '',
            email: '',
            password: '',
            password_confirm: '',
            role_id: '',
            role: {
                id: 0,
                name: '',
                permission: ''
            }
        }

    };


    constructor(public layoutService: LayoutService, private loginService: LoginService,) {
        loginService.getinfoUser().subscribe({
            next: (usuario: usuarioInfo) => {
                this.usuario = usuario;
                if (this.usuario?.user?.role?.name === 'Superadministrador')
                    this.model = [

                        {
                            label: 'Super administrador',
                            items :
                                [
                                    {
                                        label: 'Inicio', icon: 'pi pi-home', routerLink: ['/inicio']
                                    }
                                ]
                        },
                        {
                            items:
                                [
                                    {
                                        label: 'Gestión de administradores', icon: 'pi pi-user-edit', routerLink: ['super-admin-admins']
                                    }
                                ]
                        },

                        {
                            label: 'Administrador',
                            items: [
    
                                { label: 'Administración usuarios', icon: 'pi pi-fw pi-user-plus', routerLink: ['admin-usuarios'] },
                            ]
                        },
                        {
                            items: [
                                { label: 'Administración libros', icon: 'pi pi-fw pi-book', routerLink: ['admin-libros'] },
                            ]
                        },
                        {
                            items: [
                                { label: 'Administración materiales', icon: 'pi pi-desktop', routerLink: ['admin-materiales'] },
                            ]
                        },
                        {
                            items: [
                                { label: 'Administración préstamos', icon: 'pi pi-fw pi-paperclip', routerLink: ['admin-prestamos'] },
                            ]
                        },
                        {
    
                            items: [
                                { label: 'Administración multas', icon: 'pi pi-fw pi-money-bill', routerLink: ['admin-multas'] },
                            ]
                        },
                        {
                            items: [
                                { label: 'Administración encuestas', icon: 'pi pi-fw pi-pencil', routerLink: ['admin-encuestas'] },
                            ]
                        }

                    ];
                else if (this.usuario?.user?.role?.name === 'Admin')
                this.model= [


                    {
                        label: 'Administrador',
                        items: [
                        
                           
                                    { label: 'Inicio', icon: 'pi pi-home', routerLink: ['/inicio'] },
                                
                         

                            { label: 'Administración usuarios', icon: 'pi pi-fw pi-user-plus', routerLink: ['admin-usuarios'] },
                        ]
                    },
                   
                    {
                        items: [
                            { label: 'Administración libros', icon: 'pi pi-fw pi-book', routerLink: ['admin-libros'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Administración materiales', icon: 'pi pi-desktop', routerLink: ['admin-materiales'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Administración préstamos', icon: 'pi pi-fw pi-paperclip', routerLink: ['admin-prestamos'] },
                        ]
                    },
                    {

                        items: [
                            { label: 'Administración multas', icon: 'pi pi-fw pi-money-bill', routerLink: ['admin-multas'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Administración encuestas', icon: 'pi pi-fw pi-pencil', routerLink: ['admin-encuestas'] },
                        ]
                    }
                ];



                else this.model = [
                    {
                        label: 'Inicio',
                        items: [
                            { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/inicio'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Préstamos', icon: 'pi pi-fw pi-book', routerLink: ['prestamos'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Multas', icon: 'pi pi-fw pi-money-bill', routerLink: ['multas'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Búsqueda', icon: 'pi pi-fw pi-search', routerLink: ['busqueda'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Fila virtual', icon: 'pi pi-fw pi-users', routerLink: ['fila-virtual'] },
                        ]
                    },
                    {
                        items: [
                            { label: 'Materiales', icon: 'pi pi-fw pi-desktop', routerLink: ['materiales'] },
                        ]
                    },

                ]


            }
        });

    }
    ngOnInit() {

    }
}
