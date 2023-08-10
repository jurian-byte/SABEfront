import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-multas-cancel',
  templateUrl: './multas-cancel.component.html',
  styleUrls: ['./multas-cancel.component.scss']
})
export class MultasCancelComponent implements OnInit {

  idsMultas:any;

  constructor( private activeRoute:ActivatedRoute) {

    this.idsMultas = this.activeRoute.snapshot.queryParamMap.get('idsmultas');

   }

  ngOnInit(): void {
  }
  cerrarVentana(){
    window.close();
  } 
}
