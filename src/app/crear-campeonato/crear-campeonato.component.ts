import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { first, range } from 'rxjs';
import { DatePipe } from '@angular/common'
import { Campeonato} from '../_interfaces/campeonatos'
import { Router } from '@angular/router';

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

  missingName!: boolean;
  missingPresupuesto!: boolean;
  missingFechaInicio!: boolean;
  missingFechaFin!: boolean;
  missingHoraInicio!: boolean;
  missingMinInicio!: boolean;
  missingHoraFin!: boolean;
  missingMinFin!: boolean;

  missingMessage !: boolean;

  formatoFechaInicio : any;
  formatoFechaFin : any;

  i = 1;

  fechasOcupadas = [];

  campeonato!: Campeonato;
  opcionesPresupuesto = new Array(101).fill(0).map((x, i)=> i);
  opcionesHora = new Array(25).fill(0).map((x, i)=> i);
  opcionesMinutos = new Array(61).fill(0).map((x, i)=> i);
  
  selectedFW = new FormControl();

  fechaMin!: Date;
  fechaMax!: Date;

  currentYear = new Date().getFullYear();
  constructor(private campeonatoSrv: CampeonatosService, private route : Router) { }

  ngOnInit(): void {
    this.fechaMin = new Date();
    this.opcionesPresupuesto.shift();
    
 
    
  }

  validarCamposRequeridos(){
    this.restaurarBanderas();
    if(this.nombre == null || this.nombre.length < 5){
      this.missingName = true;
      this.missingMessage = true;
    }
    if(this.presupuesto == null){
      this.missingPresupuesto = true;
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
    this.route.navigate(['/campeonatos']);
    
  }

  cancelar(){
    this.route.navigate(['/campeonatos']);
  }

  restaurarBanderas(){
    this.missingName = false;
    this.missingPresupuesto = false;
    this.missingFechaInicio = false;
    this.missingFechaFin = false;
    this.missingHoraInicio = false;
    this.missingMinInicio = false;
    this.missingHoraFin = false;
    this.missingMinFin = false;
  
    this.missingMessage = false;
  }

}
