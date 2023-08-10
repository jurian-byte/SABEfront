export interface Usuario {

    id?: number;
    numeroBoleta?: string;
    nombres?: string;
    apellidoPaterno?: string;
    apellidoMaterno?: string;
    calle?: string;
    colonia?: string;
    delegacionMunicipio?: string;
    codigoPostal?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    celular?: string;
    email?: string;
    password?: string;
    password_confirm?: string;
    role_id?: string;
    role?: {
      id: number;
      name: string;
      permission: string;
    }
  }
  


  export interface usuarioInfo {
    multas: number;
    prestamosActivos: number;
    prestamosFinalizados: number;
    turnosActivos: number;
    user : Usuario;
  }

    export class UsuarioLogin {
  email: string;
  password: string;
  constructor(usuario?: UsuarioLogin) {
      if (usuario) {
          this.email = usuario.email;
          this.password = usuario.password;
      } else {
          this.email = "";
          this.password = "";
      }
  }
}

export class UsuarioLoginResponse {
  User: Usuario;
  JWT: string;
  constructor(usuario?: UsuarioLoginResponse) {
      if (usuario) {
          this.User = usuario.User;
          this.JWT = usuario.JWT;
      } else {
          this.User = {};
          this.JWT = "";
      }
  }
}
