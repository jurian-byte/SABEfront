
export class Notificacion{
    ID: string;
    titulo: string;
    descripcion: string;
    fecha: string;
    visto: boolean;
    importante: boolean;
    ruta: string;
    actions: string[];
    constructor(notificacion?: Notificacion) {
        if (notificacion) {
            this.ID = notificacion.ID;
            this.titulo = notificacion.titulo;
            this.descripcion = notificacion.descripcion;
            this.fecha = notificacion.fecha;
            this.visto = notificacion.visto;
            this.importante = notificacion.importante;
            this.ruta = notificacion.ruta;
            this.actions = notificacion.actions;
        } else {
            this.ID = "";
            this.titulo = "";
            this.descripcion = "";
            this.fecha = "";
            this.visto = false;
            this.importante = false;
            this.ruta = "";
            this.actions = [];
        }
    }
}
