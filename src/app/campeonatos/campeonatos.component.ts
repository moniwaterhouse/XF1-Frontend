/**
 * Campeonato es un componente de angular que permite obtener los campeonatos existentes y mostrar la información de cada uno de ellos en el UI por medio de una tabla.
 * Importa CampeonatosService que es un servicio por medio del cual se hacen requests a la base de datos para obtener las información requerida de los campeonatos.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from '@app/_services/auth-guard.service';
import { first } from 'rxjs';
import { CampeonatosService } from '../_services/campeonatos.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss']
})

export class CampeonatosComponent implements OnInit {

  campeonatos: any;
  correo !: any;

  constructor( private campeonatoSrv: CampeonatosService, private auth : AuthGuardService, private route: Router) { 
    this.auth.correoAux.subscribe((u: string) => { this.correo = u });

    if(this.correo == "" || this.correo == null){
      this.route.navigate(['/']);
    }
  }

  ngOnInit(): void {
    

    this.campeonatoSrv.getCampeonatos().pipe(first()).subscribe(response =>
      {this.campeonatos = response;}); 
  }
}
