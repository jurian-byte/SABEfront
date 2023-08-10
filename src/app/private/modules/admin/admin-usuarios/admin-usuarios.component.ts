import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/core/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.scss'],
  providers: [MessageService]
})
export class AdminUsuariosComponent implements OnInit {


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



  constructor(private UsuarioService: UsuarioService, private messageService: MessageService,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getUsarios();
   

  }



  
  getUsarios(): void
  {this.UsuarioService.getUsuarios().subscribe({
    next: (Usuarios: any[]) => {
      this.Usuarios = Usuarios;
      this.filterUsers();
     
    },
    error: (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "No fue posible obtener los usuarios" });

    }
  });
  this.roles = [
    { label: 'Profesor', value: 'Profesor' },
    { label: 'Alumno', value: 'Alumno' },
   
    
  ];
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
      this.UsuarioService.addUsuario(this.Usuario).subscribe({
        next: (usuario: Usuario) => {
          this.Usuario = usuario;
          this.Usuarios.unshift(usuario);
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado', life: 3000 });
          this.UsuarioDialog = false;
          this.Usuario = {};
        },
        error: (error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'No se pudo crear el usuario';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        }
      });
    } else {
      const index = this.findIndexById(this.Usuario.id as number);
      if (index >= 0) {
        this.UsuarioService.updateUsuario(this.Usuario).then(() => {
          this.Usuarios[index] = this.Usuario;
          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario actualizado', life: 3000 });
          this.UsuarioDialog = false;
          this.Usuario = {};
        }).catch((error: HttpErrorResponse) => {
          const errorMessage = error.error.message || 'No se pudo actualizar el usuario';
          this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
        });
      }
    }
  }
  

refresh(){
  this.UsuarioService.getUsuarios().subscribe({
    next: (usuarios: Usuario[]) => {
      this.Usuarios = usuarios;
      this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Usuario creado', life: 3000 });
      this.UsuarioDialog = false;
      this.Usuario = {};
    },
    error: (error: any) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener la lista de usuarios', life: 3000 });
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


  buscar() {
    if (this.numeroBoletaEmpleado && this.numeroBoletaEmpleado.trim() !== '') {
      this.UsuariosCopia = this.Usuarios.filter(usuario =>
        usuario.numeroBoleta && usuario.numeroBoleta.toLowerCase().includes(this.numeroBoletaEmpleado.trim().toLowerCase())
      );
    } else {
      this.UsuariosCopia = this.Usuarios.slice(); 
    }
  }

 

}







