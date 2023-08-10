export interface DevolucionesL {

  idPrestamoL: number;
  nombre : string;
  libro_ISBN: number;
  inicio: Date;
  vencimiento: Date;
  estado: string;
  }

  export interface DevolucionesM {
   
  idPrestamoM: number;
  material_id: number;
  nombreMaterial: string;
  inicio: Date;
  vencimiento: Date;
  estado: string;
  }