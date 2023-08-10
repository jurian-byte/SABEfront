import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Multas } from '../../../models/multas';
import { MultaService } from '../../../services/core/multas.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.scss'],
  providers: [MessageService],
})
export class MultasComponent implements OnInit {
  private stripe: any;
  multas: Multas[] = [];
  first = 0;
  rows = 10;
  totalAPagar: number = 0;

  constructor(private multaService: MultaService, private messageService: MessageService) { }

  ngOnInit(): void{
    this.getMultasByUser();

  }

  getMultasByUser(): void {
    this.multaService.getMultasByUser().subscribe({
      next: (multas: Multas[]) => {
        this.multas = multas
        this.totalAPagar = this.calcularTotalAPagar();
      },
      error: (error: Error) => {
        console.log('Error al obtener multas: ', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No fue posible obtener las multas' });
      }
    });
  }
  
  realizarPago() {
    const totalAPagar = this.calcularTotalAPagar();
    this.multaService.realizarPago(totalAPagar).subscribe(
      {
        next: (response) => {
          window.open(response, '_blank');
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

  calcularTotalAPagar(): number {
    return this.multas.reduce((total, multa) => total + multa.monto, 0);
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    return this.multas ? this.first === (this.multas.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.multas ? this.first === 0 : true;
  }
}
