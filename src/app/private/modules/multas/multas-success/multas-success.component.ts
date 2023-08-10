import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Multas } from 'src/app/models/multas';
import { MultaService } from 'src/app/services/core/multas.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-multas-success',
  templateUrl: './multas-success.component.html',
  styleUrls: ['./multas-success.component.scss']
})
export class MultasSuccessComponent implements OnInit {

 // idsMultas: any;
  loading = true;

  multas: Multas[] = [];
  multa!:Multas;

  constructor(private activeRoute: ActivatedRoute, private multaService: MultaService) {
  }

   /*  this.idsMultas = this.activeRoute.snapshot.queryParamMap.get('idsmultas');

    let multasUpdate$: Observable<Multas>[] = [];

    let ids = this.idsMultas.split(',');
    ids.forEach((id: any) => {
      let multa: Multas = {
        idmultas: Number(id),
        numeroBoleta: "",
        isbn: 0,
        nombre: "",
        fechagenerada: new Date(),
        monto: 0,
        estado: 0,
      }
      multasUpdate$.push(multaService.updateMulta(multa));
    });
    


    forkJoin(multasUpdate$).subscribe(
      {
        next: data => {
          console.log(data);
          this.loading = false;
        },
        error: error => {
          console.error('There was an error!', error);

          this.loading = false;
        }

      }
    );

  } */

  ngOnInit(): void {
    this.multaService.updateMultaByUser().subscribe(
      (multa: Multas) => { // Aquí es un solo objeto Multas, no un array
        this.multa = multa;
        console.log('Multa actualizada:', this.multa);
      },
      (error: any) => {
        console.error('Error actualizando multa:', error);
      }
    );
    




  }

  

  cerrarVentana() {
    window.close();
  }

}

