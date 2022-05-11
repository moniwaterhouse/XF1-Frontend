import { Component, OnInit } from '@angular/core';

interface Campeonato {
  id: string;
  nombre: string;
  presupuesto: number;
  fechaInicio: string;
  horaInicio: string;
  fechaFin: string;
  horaFin: string;
  reglasPuntuacion: string;

}

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

  campeonato!: Campeonato[];

  constructor() { }

  ngOnInit(): void {
  }

  crearCampeonato(){
    this.campeonato = [
      {id: this.id, nombre: this.nombre, presupuesto: this.presupuesto, fechaInicio: this.fechaInicio, horaInicio: this.horaInicio, fechaFin: this.fechaFin, horaFin: this.horaFin, reglasPuntuacion: this.reglasPuntuacion}
    ];
    console.log(this.campeonato)
  }

}
