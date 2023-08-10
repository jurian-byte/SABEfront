export interface Notificacion {
    idUser: number;
    tipo: string;
    resumen: string;
    detalles: string;
    creado_en: Date;
    leido: boolean;
  }