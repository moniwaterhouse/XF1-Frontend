import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../_interfaces/campeonatos'
import { first } from 'rxjs';
import { CampeonatosService } from '../_services/campeonatos.service';

@Component({
  selector: 'app-campeonatos',
  templateUrl: './campeonatos.component.html',
  styleUrls: ['./campeonatos.component.scss']
})
export class CampeonatosComponent implements OnInit {

  campeonatos: any;

  constructor( private campeonatoSrv: CampeonatosService) { }

  ngOnInit(): void {
    this.campeonatoSrv.getCampeonatos().pipe(first()).subscribe(response =>
      {this.campeonatos = response;
      console.log(this.campeonatos)}); 
    
      this.campeonatoSrv.getFechasUtilizadas().pipe(first()).subscribe(response => console.log(response))
  }
}
