import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Usuario, usuarioInfo } from '../../../models/usuario';
import { LoginService } from '../../../services/public/login.service';
import { UsuarioService } from '../../../services/core/usuario.service';


@Component({

  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [MessageService]


})
export class PerfilComponent implements OnInit {

  formUsuario!: FormGroup;
  formPassword!: FormGroup;

  usuarioInfo: usuarioInfo = {
    multas: 0,
    prestamosActivos: 0,
    prestamosFinalizados: 0,
    turnosActivos: 0,
    user: {
      id: 0,
      numeroBoleta: "",
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      calle: "",
      colonia: "",
      delegacionMunicipio: "",
      codigoPostal: "",
      numeroExterior: "",
      numeroInterior: "",
      celular: "",
      email: "",
      password: "",
      password_confirm: "",
      role_id: "",
      role: {
        id: 0,
        name: "",
        permission: ""
      }
    }
 
  
  

   

  };


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

    this.getUsuarioInfo();

    this.formUsuario = this.formBuilder.group({
      id: [this.usuarioInfo.user.id],
      numeroBoleta: [this.usuarioInfo.user.numeroBoleta],
      nombres: [this.usuarioInfo.user.nombres],
      apellidoPaterno: [this.usuarioInfo.user.apellidoPaterno],
      apellidoMaterno: [this.usuarioInfo.user.apellidoMaterno],
      calle: [this.usuarioInfo.user.calle],
      colonia: [this.usuarioInfo.user.colonia],
      delegacionMunicipio: [this.usuarioInfo.user.delegacionMunicipio],
      codigoPostal: [this.usuarioInfo.user.codigoPostal],
      numeroExterior: [this.usuarioInfo.user.numeroExterior],
      numeroInterior: [this.usuarioInfo.user.numeroInterior],
      celular: [this.usuarioInfo.user.celular],
      email: [this.usuarioInfo.user.email],
      password: [this.usuarioInfo.user.password],
      password_confirm: [this.usuarioInfo.user.password_confirm],
      role_id: [this.usuarioInfo.user.role_id],

    });

    this.formPassword = this.formBuilder.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });



  }


  getUsuarioInfo() {
    this.loginService.getinfoUser().subscribe({
      next: (response) => {
        this.usuarioInfo = response;
      }
    });

  }

  changeProfileInfo(): void {
    if (this.formUsuario && this.formUsuario.valid) {
      const usuario: Usuario = this.formUsuario.value;
      usuario.id = this.usuarioInfo.user.id;
  
      this.usuarioService.updateUsuariobyUser(usuario)
        .subscribe(
          updatedUsuario => {
            console.log('Usuario actualizado:', updatedUsuario);
            this.messageService.add({ severity: 'success', summary: 'Información actualizada', detail: 'La información se ha actualizado correctamente' });
          },
          error => {
            console.error('Error al actualizar usuario', error);
            this.messageService.add({ severity: 'error', summary: 'Error al actualizar', detail: 'Ocurrió un error al actualizar la información del usuario' });
          }
        );
    } else {
      console.log('Formulario de usuario inválido');
    }
  }
  

  changePassword(): void {
    if (this.formPassword && this.formPassword.valid) {
      const newPassword = this.formPassword.value.newPassword;
      const usuarioId = this.usuarioInfo.user.id ?? 0; 
  
      this.usuarioService
        .updatePassword(usuarioId, newPassword)
        .subscribe(
          () => {
            console.log('Contraseña actualizada correctamente');
            this.messageService.add({ severity: 'success', summary: 'Contraseña actualizada', detail: 'La contraseña se ha actualizado correctamente' });
          },
          (error) => {
            console.error('Error al actualizar la contraseña', error);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar la contraseña' });
          }
        );
    } else {
      console.log('Formulario de contraseña inválido');
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Por favor, completa correctamente todos los campos del formulario de contraseña' });
    }
  }
  
  
  
  
  


 



}
