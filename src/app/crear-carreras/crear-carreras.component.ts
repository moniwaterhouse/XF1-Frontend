import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Carrera } from '@app/_interfaces/carreras';
import { CarrerasService } from '@app/_services/carreras.service';
import { first } from 'rxjs';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-crear-carreras',
  templateUrl: './crear-carreras.component.html',
  styleUrls: ['./crear-carreras.component.scss']
})


export class CrearCarrerasComponent implements OnInit {

  
  nombre!: string;
  campeonato!: any;
  pais!: string;
  pista!: string;
  fechaInicio!: Date;
  horaInicio!: number;
  minInicio!: number;
  fechaFin!: Date;
  horaFin!: number;
  minFin!: number;

  tiempoInicio!: string;
  tiempoFin!: string;

  missingName !: boolean;
  missingCampeonato !: boolean;
  missingPais !: boolean;
  missingPista !: boolean;
  missingFechaInicio !: boolean;
  missingFechaFin !: boolean;
  missingHoraInicio !: boolean;
  missingMinInicio !: boolean;
  missingHoraFin !: boolean;
  missingMinFin !: boolean;

  missingMessage !: boolean;

  errorMinNombre !: boolean;
  errorMinPista !: boolean;
  campeonatoSeleccionado !: boolean;

  formatoFechaInicio : any;
  formatoFechaFin : any;


  i = 1;

  fechasOcupadas = [];

  carrera!: Carrera;
  
  opcionesHora = new Array(25).fill(0).map((x, i)=> i);
  opcionesMinutos = new Array(61).fill(0).map((x, i)=> i);
  
  selectedFW = new FormControl();

  fechaMin!: Date;
  fechaMax!: Date;

  currentYear = new Date().getFullYear();

  campeonatosExistentes : any;
  fechasCampeonato : any;

  listaPaises = [

    "Argentina",
    "Aruba",
    "Australia",
    "Austria",
    "Bahamas (the)",
    "Bahrain",
    "Belgium",
    "Belize",
    "Brazil",
    "Bulgaria",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Czechia",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Finland",
    "France",
    "Germany",
    "Ghana",
    "Greece",
    "Greenland",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Hong Kong",
    "Hungary",
    "Iceland",
    "India",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Luxembourg",
    "Malaysia",
    "Maldives",
    "Mexico",
    "Monaco",
    "New Zealand",
    "Nicaragua",
    "Norway",
    "Panama",
    "Paraguay",
    "Peru",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Qatar",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "Spain",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Turkey",
    "United States of America",
    "Uruguay",
    "Venezuela",
  ];

myDateFilter = (d: Date | null): boolean => {
  const year = (d || new Date()).getFullYear();
  return year >= this.currentYear -1 && year <= this.currentYear + 1;
} 

  constructor(private carreraSrv:CarrerasService, private campeonatoSrv:CampeonatosService, private route : Router) {
    this.campeonatoSeleccionado = false;
   }

  ngOnInit(): void {
    this.campeonatoSrv.getCampeonatos().pipe(first()).subscribe(response =>
      {this.campeonatosExistentes = response;});
  }

  validarCamposRequeridos(){
    this.resetFlags();

    if(this.nombre == null || this.nombre.length < 5){
      this.missingName = true;
      this.missingMessage = true;
    }
    if(this.pais == null){
      this.missingPais = true;
      this.missingMessage = true;
    }
    if(this.pista == null || this.pista.length < 5){
      this.missingPista = true;
      this.missingMessage = true;
    }
    if(this.campeonato == null){
      this.missingCampeonato = true;
      this.missingMessage = true;
    }
    if(this.fechaInicio == null){
      this.missingFechaInicio = true;
      this.missingMessage = true;
    }
    if(this.horaInicio == null){
      this.missingHoraInicio = true;
      this.missingMessage = true;
    }
    if(this.minInicio == null){
      this.missingMinInicio = true;
      this.missingMessage = true;
    }
    if(this.fechaFin == null){
      this.missingFechaFin = true;
      this.missingMessage = true;
    }
    if(this.horaFin == null){
      this.missingHoraFin = true;
      this.missingMessage = true;
    }
    if(this.minFin == null){
      this.missingMinFin = true;
      this.missingMessage = true;
    }
   
    if(!this.missingMessage){

      
      this.tiempoInicio = this.horaInicio.toString()+":"+this.minInicio.toString();
      this.tiempoFin = this.horaFin.toString()+":"+this.minFin.toString();
      const datepipe: DatePipe = new DatePipe('en-US');
      this.formatoFechaInicio = datepipe.transform(this.fechaInicio, 'YYYY-MM-dd');
      this.formatoFechaFin = datepipe.transform(this.fechaFin, 'YYYY-MM-dd');
      this.crearCarrera();
    }    
  }

  crearCarrera(){
    this.carrera = 
      {nombre: this.nombre, idCampeonato: this.campeonato, nombrePais: this.pais, nombrePista: this.pista, fechaInicio: this.formatoFechaInicio, horaInicio: this.tiempoInicio, fechaFin: this.formatoFechaFin, horaFin: this.tiempoFin};
    
    this.carreraSrv.crearCarrera(this.carrera).pipe(first()).subscribe();

    this.route.navigate(['/carreras']);
    
  }

  cancelar(){
    this.route.navigate(['/carreras']);
  }

  resetFlags(){
    this.missingName = false;
  this.missingCampeonato = false;
  this.missingPais = false;
  this.missingPista = false;
  this.missingFechaInicio = false;
  this.missingFechaFin = false;
  this.missingHoraInicio = false;
  this.missingMinInicio = false;
  this.missingHoraFin = false;
  this.missingMinFin = false;

  this.missingMessage = false;

  this.errorMinNombre = false;
  this.errorMinPista = false;
  }

  onCampeonatoSeleccionado(){
    this.campeonatoSeleccionado = true;
    this.fechaMin = this.campeonato.fechaInicio;
    this.fechaMax = this.campeonato.fechaFin;
      
    

  }

}
