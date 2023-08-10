export interface PrestamoLibros{
  numeroBoleta: string;
  idPrestamoL: number;
  nombre : string;
  libro_ISBN: number;
  inicio: Date;
  vencimiento: Date;
  estado: string;	
}

export interface PrestamoMaterial{
  numeroBoleta: string;
  idPrestamoM: number;
 material_id: number;
  nombreMaterial: string;
  inicio: Date;
  vencimiento: Date;
  estado: string;
}
