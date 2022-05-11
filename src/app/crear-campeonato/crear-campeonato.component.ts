import { Component, OnInit } from '@angular/core';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { first } from 'rxjs';
import { Campeonato} from '../_interfaces/campeonatos'

@Component({
  selector: 'app-crear-campeonato',
  templateUrl: './crear-campeonato.component.html',
  styleUrls: ['./crear-campeonato.component.scss']
})
export class CrearCampeonatoComponent implements OnInit {

  id!: string;
  nombre!: string;
  presupuesto!: number;
  fechaInicio!: string;
  horaInicio!: string;
  fechaFin!: string;
  horaFin!: string;
  reglasPuntuacion!: string;

  campeonato!: Campeonato;

  constructor(private campeonatoSrv: CampeonatosService) { }

  ngOnInit(): void {
  }

  crearCampeonato(){
    this.campeonato = 
      {id: "", nombre: "Campeonato 2026", presupuesto: 5, fechaInicio: "2026-05-05", horaInicio: "12:00", fechaFin: "2026-12-12", horaFin: "14:30", reglasPuntuacion: "Test3"}
    ;
    this.campeonatoSrv.crearCampeonato(this.campeonato).pipe(first()).subscribe();
    
  }

}
