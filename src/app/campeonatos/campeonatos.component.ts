import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CampeonatosService } from './campeonatos.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss']
})
export class CampeonatosComponent implements OnInit {

  campeonatos : any;

  constructor( private campeonatoSrv: CampeonatosService) { }

  ngOnInit(): void {
    this.campeonatoSrv.getCampeonato().pipe(first()).subscribe(campeonatos => this.campeonatos = campeonatos)
    console.log(this.campeonatos)
  }

}
