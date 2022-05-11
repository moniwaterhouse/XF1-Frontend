import { Component, OnInit } from '@angular/core';

interface Carrera {
  nombre: string;
  campeonato: string;
  pais: string;
  pista: string;
  fechaInicio: string;
  horaInicio: string;
  fechaFin: string;
  horaFin: string;

}

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.scss']
})
export class CrearCarreraComponent implements OnInit {

  nombre!: string;
  campeonato!: string;
  pais!: string;
  pista!: string;
  fechaInicio!: string;
  horaInicio!: string;
  fechaFin!: string;
  horaFin!: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
