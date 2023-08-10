import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/core/usuario.service';


@Component({
  selector: 'app-super-admin-admins',
  templateUrl: './super-admin-admins.component.html',
  styleUrls: ['./super-admin-admins.component.scss'],
  providers: [MessageService]

})
export class SuperAdminAdminsComponent implements OnInit {

  searchText: string = '';
  UsuarioDialog: boolean = false;
  filteredUsers: Usuario[] = [];

  deleteUsuarioDialog: boolean = false;

  deleteUsuariosDialog: boolean = false;

  Usuarios: Usuario[] = [];
  UsuariosCopia: Usuario[] = [];


  Usuario: Usuario = {};

  selectedUsuarios: Usuario[] = [];

  submitted: boolean = false;

  roles: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  numeroBoletaEmpleado: string = '';

  usuariosOriginales: Usuario[] = [];



  constructor(private UsuarioService: UsuarioService, private messageService: MessageService) { }

  ngOnInit() {
    this.getAdmin();
   

  }

  getAdmin(): void
  {this.UsuarioService.getAdmins().subscribe({
    next: (Usuarios: any[]) => {
      this.Usuarios = Usuarios;
      this.filterUsers();
     
    },
    error: (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener los administradores" });

    }
  });
}


filterUsers(): void {
  if (!this.searchText) {
    this.filteredUsers = this.Usuarios;
  } else {
    this.filteredUsers = this.Usuarios.filter((usuario: Usuario) => {
      let searchIn = [
        usuario.numeroBoleta,
        usuario.nombres,
        usuario.apellidoPaterno,
        usuario.apellidoMaterno
      ].join(' ').toLowerCase();

      return searchIn.includes(this.searchText.toLowerCase());
    });
  }
}

  

  openNew() {
    this.Usuario = {};
    this.submitted = false;
    this.UsuarioDialog = true;
  }



  deleteSelectedUsuarios() {
    this.deleteUsuariosDialog = false;
    const selectedIds = this.selectedUsuarios.map(usuario => usuario.id);
    this.UsuarioService.deleteUsuarios(this.selectedUsuarios).toPromise()
        .then(() => {
           
            selectedIds.forEach(id => {
                const index = this.Usuarios.findIndex(usuario => usuario.id === id);
                if (index > -1) {
                    this.Usuarios.splice(index, 1);
                }
            });
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administradores eliminados', life: 3000 });
            this.selectedUsuarios = [];
        })
        .catch(() => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron eliminar los administradores', life: 3000 });
        });
}


  editUsuario(usuario: Usuario) {
    this.Usuario = { ...usuario };
    this.UsuarioDialog = true;
  }

  deleteUsuarios(usuario: Usuario) {
    this.Usuario = { ...usuario };
    this.deleteUsuarioDialog = true;
  }


  confirmDelete() {
    this.deleteUsuarioDialog = false;
    if (!this.Usuario || !this.Usuario.id) {
      return;
    }
  
    const index = this.Usuarios.findIndex(usuario => usuario.numeroBoleta === this.Usuario.numeroBoleta);
  
    this.UsuarioService.deleteUsuario(this.Usuario.id).toPromise()
      .then(() => {
        if (index > -1) {
          this.Usuarios.splice(index, 1);
        }
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administrador eliminado', life: 3000 });
        this.Usuario = {};
      })
      .catch((error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el administrador', life: 3000 });
      });
  }
  



  confirmDeleteSelected() {
    this.deleteUsuariosDialog = true;
  }


  hideDialog() {
    this.UsuarioDialog = false;
    this.submitted = false;
  }
  saveUsuario() {
    this.submitted = true;
    if (!this.Usuario.nombres?.trim()) {
      return;
    }
    if (!this.Usuario.id) {
      this.UsuarioService.addAdmin(this.Usuario).subscribe({
        next: (usuario: Usuario) => {
          this.Usuario = usuario;
          this.Usuarios.unshift(usuario);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administrador creado', life: 3000 });
          this.UsuarioDialog = false;
          this.Usuario = {};
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el administrador', life: 3000 });
        }
      });
    } else {
      const index = this.findIndexById(this.Usuario.id as number);
      if (index >= 0) {
        this.UsuarioService.updateUsuario(this.Usuario).then(() => {
          this.Usuarios[index] = this.Usuario;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Administrador actualizado', life: 3000 });
          this.UsuarioDialog = false;
          this.Usuario = {};
        }).catch(() => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el administrador', life: 3000 });
        });
      }
    }
  }
  

  



refresh(){

  this.UsuarioService.getUsuarios().subscribe({
    next: (usuarios: Usuario[]) => {
      this.Usuarios = usuarios;
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado', life: 3000 });
      this.UsuarioDialog = false;
      this.Usuario = {};
    },
    error: (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la lista de administradores', life: 3000 });
    }
  });
}

  showDeleteUsuarioDialog(usuario: Usuario) {
    this.Usuario = usuario;
    this.deleteUsuarioDialog = true;
  }

  showDeleteUsuariosDialog() {
    this.deleteUsuariosDialog = true;
  }


  findIndexById(id: number): number {
    return this.Usuarios.findIndex(usuario => usuario.id === id);
  }


 

}