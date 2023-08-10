import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { BuzonService } from 'src/app/services/core/buzon.service';
import { Table } from 'primeng/table';



interface InventoryStatus {
    label: string;
    value: string;
}
export interface Usuario {
    idUsuario?: string;
    nombre?: string;
    apellidoP?: string;
    apellidoM?: string;
    telefono?: number;
    calle?: string;
    colonia?: string;
    delegacion?: string;
    cp?: number;
    ext?: number;
    int?: number;
    email?: string;
    password?: string;
    rol?: boolean;
}

@Component({
    selector: 'app-buzon',
    templateUrl: './buzon.component.html',
    styleUrls: ['./buzon.component.scss'],
    providers: [MessageService]
})
export class BuzonComponent implements OnInit {


    UsuarioDialog: boolean = false;

    deleteUsuarioDialog: boolean = false;

    deleteUsuariosDialog: boolean = false;

    Usuarios: Usuario[] = [];

    Usuario: Usuario = {};

    selectedUsuarios: Usuario[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    roles: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    items: MenuItem[] = [];
    home: MenuItem = {};

    constructor(private UsuarioService: BuzonService, private messageService: MessageService) { }

    ngOnInit() {
        this.UsuarioService.getUsuarios().then(data => this.Usuarios = data);

        this.cols = [
            
            { field: 'id', header: 'ID' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'apellidoP', header: 'Apellido Paterno' },
            { field: 'apellidoM', header: 'Apellido Materno' },
            { field: 'calle', header: 'Calle' },
            { field: 'colonia', header: 'Colonia' },
            { field: 'delegación', header: 'Delegación' },
            { field: 'cp', header: 'Código Postal' },
            { field: 'ext', header: 'Número Exterior' },
            { field: 'int', header: 'Número Interior' },
            { field: 'email', header: 'Correo Electrónico' },
            { field: 'password', header: 'Contraseña' },
            { field: 'rol', header: 'Rol' },
        
        ];

        this.roles = [
            { label: 'Profesor', value: 'Profesor' },
            { label: 'Alumno', value: 'Alumno' },
            { label: 'Administrador', value: 'Administrador'}

        ];

        this.items = [
            { label: 'Buzon' }
        ];

        this.home = { icon: 'pi pi-home', routerLink: "/inicio" };

    }

    openNew() {
        this.Usuario = {};
        this.submitted = false;
        this.UsuarioDialog = true;
    }

    deleteSelectedUsuarios() {
        this.deleteUsuariosDialog = false;
    }

    editUsuario(Usuario: Usuario) {
        this.Usuario = { ...Usuario };
        this.UsuarioDialog = true;
    }

    deleteUsuario(Usuario: Usuario) {
        this.deleteUsuarioDialog = true;
        this.Usuario = { ...Usuario };
    }

    confirmDeleteSelected() {
        this.deleteUsuariosDialog = false;
        this.Usuarios = this.Usuarios.filter(val => !this.selectedUsuarios.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuarios eliminados', life: 3000 });
        this.selectedUsuarios = [];
    }

    confirmDelete() {
        this.deleteUsuarioDialog = false;
        this.Usuarios = this.Usuarios.filter(val => val.idUsuario !== this.Usuario.idUsuario);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario eliminado', life: 3000 });
        this.Usuario = {};
    }

    hideDialog() {
        this.UsuarioDialog = false;
        this.submitted = false;
    }

    saveUsuario() {
        this.submitted = true;
        if (this.Usuario.nombre?.trim()) {
            if (this.Usuario.idUsuario) {
                // @ts-ignore
                this.Usuario.inventoryStatus = this.Usuario.inventoryStatus.value ? this.Usuario.inventoryStatus.value : this.Usuario.inventoryStatus;
                this.Usuarios[this.findIndexById(this.Usuario.idUsuario)] = this.Usuario;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario actualizado', life: 3000 });
            } else {
                this.Usuario.idUsuario = this.createId();

                // @ts-ignore
                this.Usuario.inventoryStatus = this.Usuario.inventoryStatus ? this.Usuario.inventoryStatus.value : 'INSTOCK';
                this.Usuarios.push(this.Usuario);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Usuario creado', life: 3000 });
            }

            this.Usuarios = [...this.Usuarios];
            this.UsuarioDialog = false;
            this.Usuario = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.Usuarios.length; i++) {
            if (this.Usuarios[i].idUsuario === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}

