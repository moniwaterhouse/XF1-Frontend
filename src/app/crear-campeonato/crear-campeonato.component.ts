import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { first, range } from 'rxjs';
import { DatePipe } from '@angular/common'
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
  fechaInicio!: Date;
  horaInicio!: number;
  minInicio!: number;
  fechaFin!: Date;
  horaFin!: number;
  minFin!: number;
  reglasPuntuacion!: string;

  tiempoInicio!: string;
  tiempoFin!: string;

  missingName = false;
  missingPresupuesto = false;
  missingFechaInicio = false;
  missingFechaFin = false;
  missingHoraInicio = false;
  missingMinInicio = false;
  missingHoraFin = false;
  missingMinFin = false;

  missingMessage = false;

  formatoFechaInicio : any;
  formatoFechaFin : any;

  i = 1;

  fechasOcupadas = [];

  campeonato!: Campeonato;
  opcionesPresupuesto = new Array(101).fill(0).map((x, i)=> i);
  opcionesHora = new Array(25).fill(0).map((x, i)=> i);
  opcionesMinutos = new Array(61).fill(0).map((x, i)=> i);
  
  selectedFW = new FormControl();

  minDate!: Date;
  maxDate!: Date;

  currentYear = new Date().getFullYear();
myDateFilter = (d: Date | null): boolean => {
  const year = (d || new Date()).getFullYear();
  return year >= this.currentYear -1 && year <= this.currentYear + 1;
} 
  constructor(private campeonatoSrv: CampeonatosService) { }

  ngOnInit(): void {
    this.opcionesPresupuesto.shift();
    
 
    
  }

  validarCamposRequeridos(){
    if(this.nombre == ""){
      this.missingName = true;
      this.missingMessage = true;
    }
    else if(this.presupuesto == null){
      this.missingPresupuesto = true;
      this.missingMessage = true;
    }
    else if(this.fechaInicio == null){
      this.missingFechaInicio = true;
      this.missingMessage = true;
    }
    else if(this.horaInicio == null){
      this.missingHoraInicio = true;
      this.missingMessage = true;
    }
    else if(this.minInicio == null){
      this.missingMinInicio = true;
      this.missingMessage = true;
    }
    else if(this.fechaFin == null){
      this.missingFechaFin = true;
      this.missingMessage = true;
    }
    else if(this.horaFin == null){
      this.missingHoraFin = true;
      this.missingMessage = true;
    }
    else if(this.minFin == null){
      this.missingMinFin = true;
      this.missingMessage = true;
    }
    else{
      if(this.reglasPuntuacion == null){
        this.reglasPuntuacion = "";
      }
      this.tiempoInicio = this.horaInicio.toString()+":"+this.minInicio.toString();
      this.tiempoFin = this.horaFin.toString()+":"+this.minFin.toString();
      const datepipe: DatePipe = new DatePipe('en-US');
      this.formatoFechaInicio = datepipe.transform(this.fechaInicio, 'YYYY-MM-dd');
      this.formatoFechaFin = datepipe.transform(this.fechaFin, 'YYYY-MM-dd');
      console.log(this.nombre);
      console.log(this.presupuesto);
      console.log(this.tiempoInicio);
      console.log(this.formatoFechaInicio);
      console.log(this.tiempoFin);
      console.log(this.formatoFechaFin);
      console.log(this.reglasPuntuacion);
      this.crearCampeonato();
    }    
  }

  crearCampeonato(){
    this.campeonato = 
      {id: "", nombre: this.nombre, presupuesto: this.presupuesto, fechaInicio: this.formatoFechaInicio, horaInicio: this.tiempoInicio, fechaFin: this.formatoFechaFin, horaFin: this.tiempoFin, reglasPuntuacion: this.reglasPuntuacion}
    ;
    
    this.campeonatoSrv.crearCampeonato(this.campeonato).pipe(first()).subscribe();
    
  }

}
