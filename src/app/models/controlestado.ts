import { EstadoSimple } from "./estadoSimple";
import { Usuario } from "./usuarios";

export class CESEstado {
    ID: string;
    nombre: string;
    descripcion: string;
    numero: string;
    estado: EstadoSimple;
    actions: string[];
    ruta: Ruta | null;
    constructor(estado?: CESEstado) {
        if (estado) {
            this.ID = estado.ID
            this.nombre = estado.nombre
            this.descripcion = estado.descripcion
            this.numero = estado.numero
            this.estado = estado.estado
            this.actions = estado.actions
            this.ruta = estado.ruta
        } else {
            this.ID = ""
            this.nombre = ""
            this.descripcion = ""
            this.numero = ""
            this.estado = 0
            this.actions = []
            this.ruta = null
        }
    }
}

export class Ruta {
    ID: string;
    nombre: string;
    descripcion: string;
    clave: string;
    estado: EstadoSimple;
    actions: string[];
    constructor(ruta?: Ruta) {
        if (ruta) {
            this.ID = ruta.ID
            this.nombre = ruta.nombre
            this.descripcion = ruta.descripcion
            this.clave = ruta.clave
            this.estado = ruta.estado
            this.actions = ruta.actions
        } else {
            this.ID = ""
            this.nombre = ""
            this.descripcion = ""
            this.clave = ""
            this.estado = 0
            this.actions = []
        }
    }

}

export class Salto {
    ID: string;
    actual: CESEstado;
    siguiente: CESEstado;
    // modulo: Modulo;
    // accion: Accion;
    estado: EstadoSimple;
    actions: string[];
    constructor(salto?: Salto) {
        if (salto) {
            this.ID = salto.ID
            this.actual = salto.actual
            this.siguiente = salto.siguiente
            //   this.modulo = salto.modulo
            //   this.accion = salto.accion
            this.estado = salto.estado
            this.actions = salto.actions
        } else {
            this.ID = ""
            this.actual = new CESEstado()
            this.siguiente = new CESEstado()
            //   this.modulo = new Modulo()
            //  this.accion = new Accion()
            this.estado = 0
            this.actions = []
        }
    }
}

export class Bitacora {
    ID: string;
    usuario: Usuario;
    fecha: Date;
    salto: Salto;
    estado: EstadoSimple;
    actions: string[];
    constructor(bitacora?: Bitacora) {
        if (bitacora) {
            this.ID = bitacora.ID
            this.usuario = bitacora.usuario
            this.fecha = bitacora.fecha
            this.salto = bitacora.salto
            this.estado = bitacora.estado
            this.actions = bitacora.actions
        } else {
            this.ID = ""
            this.usuario = new Usuario()
            this.fecha = new Date()
            this.salto = new Salto()
            this.estado = 0
            this.actions = []
        }
    }
}
