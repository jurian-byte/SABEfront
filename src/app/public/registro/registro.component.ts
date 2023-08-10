import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/public/usuario.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [MessageService]
})
export class RegistroComponent implements OnInit {
  formUsuario!: FormGroup;
  roles = [{ label: 'Alumno', value: 'Alumno' }, { label: 'Profesor', value: 'profesor' }];
  cargando: boolean = false;

  avisoPrivacidad: boolean = false;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private MessageService:MessageService, private router:Router) { }

  ngOnInit(): void {
    this.formUsuario = this.formBuilder.group({
      numeroBoleta: [null, [Validators.required,Validators.pattern("^[0-9]{10}$")]],
      nombres: ['', [Validators.required, Validators.minLength(3)]],
      apellidoPaterno: ['', [Validators.required, Validators.minLength(4)]],
      apellidoMaterno: ['', [Validators.required, Validators.minLength(4)]],
      calle: ['', [Validators.required, Validators.minLength(4)]],
      colonia: ['', [Validators.required, Validators.minLength(5)]],
      delegacionMunicipio: ['', [Validators.required, Validators.minLength(6)]],
      codigoPostal: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      numeroExterior: ['', [Validators.required, Validators.minLength(2)]],
      numeroInterior: ['', [Validators.required, Validators.minLength(2)]],    
      celular: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
     
    });
  }

  onSubmit() {
    if (this.formUsuario && this.formUsuario.valid) {
      this.cargando = true;
      const usuario: Usuario = {
        numeroBoleta: this.formUsuario.get('numeroBoleta')?.value,
        nombres: this.formUsuario.get('nombres')?.value,
        apellidoPaterno: this.formUsuario.get('apellidoPaterno')?.value,
        apellidoMaterno: this.formUsuario.get('apellidoMaterno')?.value,
        calle: this.formUsuario.get('calle')?.value,
        colonia: this.formUsuario.get('colonia')?.value,
        delegacionMunicipio: this.formUsuario.get('delegacionMunicipio')?.value,
        codigoPostal: this.formUsuario.get('codigoPostal')?.value,
        celular: this.formUsuario.get('celular')?.value,
        email: this.formUsuario.get('email')?.value,
        role_id: this.formUsuario.get('role_id')?.value,
        numeroExterior: this.formUsuario.get('numeroExterior')?.value,
        numeroInterior: this.formUsuario.get('numeroInterior')?.value,
        password: this.formUsuario.get('password')?.value,
        password_confirm: this.formUsuario.get('password_confirm')?.value,
      };
       

      
      this.usuarioService.registrarUsuario(usuario).subscribe(
        res => {
          console.log(res);
          this.cargando = false;
          this.router.navigate(['/login']);
        },
        err => {
          console.error(err);
          this.cargando = false;
          // Agrega un mensaje de error usando MessageService
          this.MessageService.add({ 
            severity: 'error', 
            summary: 'Error', 
            detail: err.error.message || 'Hubo un error al registrar al usuario.' 
          });
        }
      );
      
    }
  }

  openAvisoPrivacidad() {
    this.avisoPrivacidad = true;
  }
  

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  

  
  
}
