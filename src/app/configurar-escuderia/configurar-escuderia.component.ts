import { Component, OnInit } from '@angular/core';
import { EscuderiasService } from '../_services/escuderias.service';
import { PilotosService } from '../_services/pilotos.service';
import { first } from 'rxjs';
import { Escuderia } from '../_interfaces/escuderias';
import { Piloto } from '../_interfaces/pilotos';
import { Jugador } from '@app/_interfaces/jugador';
import { JugadorService } from '@app/_services/jugador.service';
import { Router } from '@angular/router';
import { EquipoService } from '@app/_services/equipo.service';
import { Equipo } from '@app/_interfaces/equipo';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-configurar-escuderia',
  templateUrl: './configurar-escuderia.component.html',
  styleUrls: ['./configurar-escuderia.component.scss']
})
export class ConfigurarEscuderiaComponent implements OnInit {

  // Declaración de variables para la asignacion de los valores de los inputs
  nombreEsc!: string;
  nombreE1!: string;
  nombreE2!: string;
  escuderiaE1!: Escuderia;
  escuderiaE2!: Escuderia;
  pilotosE1: Array<Piloto> = [];
  pilotosE2: Array<Piloto> = [];
  jugador !: Jugador;

  // Variable para seleccionar entre equipos, si es verdadera es equipo 1 si es falsa es equipo 2
  equipo: boolean = true;
  // Variable para seleccionar entre escuderias o pilotos, si es verdadera son escuderias si es falsa son pilotos
  escOPil: boolean = true;

  // Variables donde se almacena la informacion obtenida del servidor
  presupuesto: number = 100;
  presupuestoE1: number = this.presupuesto;
  presupuestoE2: number = this.presupuesto;
  escuderias: any;
  pilotos: any;
  nombresEscuderias: any;

  // Banderas para validar la informacion ingresada
  faltaNombreEsc: boolean = false;
  faltaNombreE1: boolean = false;
  faltaNombreE2: boolean = false;
  nombreEscTomado: boolean = false;
  incompletoE1: boolean = false;
  incompletoE2: boolean = false;
  pilotosE1completos: boolean = false;
  pilotosE2completos: boolean = false;
  cuentaCreada: boolean = false;


  // Objetos para hacer los posts para la creación de la cuenta de jugador
  equipo1 !: Equipo;
  equipo2 !: Equipo;
  idEquipo1 !: any;
  idEquipo2 !: any;


  constructor(private escuderiasSrv: EscuderiasService, private pilotosSrv: PilotosService, private jugadorSrv: JugadorService, private equipoSrv : EquipoService, private route : Router) { }

  ngOnInit(): void {
    this.escuderiasSrv.getEscuderias().pipe(first()).subscribe(response => { this.escuderias = response; });
    this.escuderiasSrv.getNombresEscuderias().pipe(first()).subscribe(response => { this.nombresEscuderias = response; });
    this.pilotosSrv.getPilotos().pipe(first()).subscribe(response => { this.pilotos = response; });
    this.jugadorSrv.jugadorAux.subscribe((u: Jugador)=>{this.jugador = u});
  }

  selecEsc(escu: Escuderia) {
    if (this.equipo) {
      this.escuderiaE1 = escu;
      this.calcPresupuesto()
    }
    if (!this.equipo) {
      this.escuderiaE2 = escu;
      this.calcPresupuesto()
    }
  }

  selecPilotos(piloto: Piloto) {
    if (this.equipo) {
      if (this.pilotosE1.includes(piloto)) {
        this.pilotosE1 = this.pilotosE1.filter(item => item != piloto)
      }
      else {
        this.pilotosE1.push(piloto);
      }
      if (this.pilotosE1.length == 5) {
        this.pilotosE1completos = true;
      }
      if (this.pilotosE1.length < 5) {
        this.pilotosE1completos = false;
      }
      this.calcPresupuesto()
      console.log(this.pilotosE1)
    }
    if (!this.equipo) {
      if (this.pilotosE2.includes(piloto)) {
        this.pilotosE2 = this.pilotosE2.filter(item => item != piloto)
      }
      else {
        this.pilotosE2.push(piloto);
      }
      if (this.pilotosE2.length == 5) {
        this.pilotosE2completos = true;
      }
      if (this.pilotosE2.length < 5) {
        this.pilotosE2completos = false;
      }
      this.calcPresupuesto()
      console.log(this.pilotosE2)
    }
    
  }

  selecEquipo1() {
    if (!this.equipo) {
      this.equipo = true;
      this.escOPil = true;
    }
  }

  selecEquipo2() {
  if (this.equipo) {
    this.equipo = false;
    this.escOPil = true;
    }
  }

  selecEscu() {
    if (!this.escOPil) {
      this.escOPil = true;
      }
  }

  selecPiloto() {
    if (this.escOPil) {
      this.escOPil = false;
    }
  }

  calcPresupuesto() {
    var paux: number = 0;
    if (this.equipo) {
      for (let i of this.pilotosE1) {
        paux = paux + i.precio;
      }
      paux = paux + this.escuderiaE1.precio;
      this.presupuestoE1 = this.presupuesto - paux;
    }
    if (!this.equipo) {
      for (let i of this.pilotosE2) {
        paux = paux + i.precio;
      }
      paux = paux + this.escuderiaE2.precio;
      this.presupuestoE2 = this.presupuesto - paux;
    }
  }

  verificarNombresEsc() {
    for (let i of this.nombresEscuderias) {
      if (i.nombreEscuderia === this.nombreEsc) {
        this.nombreEscTomado = true;
        break
      }
      else {
        this.nombreEscTomado = false;
      }
    }
  }

  validarCamposRequeridos() {
    this.verificarNombresEsc()
    if (this.nombreEsc == null || this.nombreEsc == "") {
      this.faltaNombreEsc = true;
    } else { this.faltaNombreEsc = false}
    if (this.nombreE1 == null || this.nombreE1 == "") {
      this.faltaNombreE1 = true;
    } else { this.faltaNombreE1 = false; }
    if (this.nombreE2 == null || this.nombreE2 == "") {
      this.faltaNombreE2 = true;
    } else { this.faltaNombreE2 = false; }
    if (!this.pilotosE1completos || this.escuderiaE1 == null || this.presupuestoE1 < 0) {
      this.incompletoE1 = true;
    } else { this.incompletoE1 = false;}
    if (!this.pilotosE2completos || this.escuderiaE2 == null || this.presupuestoE2 < 0) {
      this.incompletoE2 = true;
    } else { this.incompletoE2 = false; }
    if (!this.faltaNombreEsc && !this.faltaNombreE1 && !this.faltaNombreE2 && !this.incompletoE1 && !this.incompletoE2 && !this.nombreEscTomado) {
      this.equipo1 = {marcaEscuderia : this.escuderiaE1.marca, nombrePiloto1: this.pilotosE1[0].nombre, nombrePiloto2 : this.pilotosE1[1].nombre, nombrePiloto3 : this.pilotosE1[2].nombre, NombrePiloto4 : this.pilotosE1[3].nombre, nombrePiloto5 : this.pilotosE1[4].nombre, puntajePublica : 0, costo : this.presupuestoE1};
      this.equipo2 = {marcaEscuderia : this.escuderiaE2.marca, nombrePiloto1: this.pilotosE2[0].nombre, nombrePiloto2 : this.pilotosE2[1].nombre, nombrePiloto3 : this.pilotosE2[2].nombre, NombrePiloto4 : this.pilotosE2[3].nombre, nombrePiloto5 : this.pilotosE2[4].nombre, puntajePublica : 0, costo : this.presupuestoE2};
      this.equipoSrv.crearEquipo(this.equipo1).pipe(first()).subscribe(response => {this.idEquipo1 = response;
        console.log(this.idEquipo1);
        this.equipoSrv.crearEquipo(this.equipo2).pipe(first()).subscribe(response => {this.idEquipo2 = response;
          console.log(this.idEquipo2);
          this.jugador.nombreEscuderia = this.nombreEsc;
          this.jugador.idEquipo1 = this.idEquipo1;
          this.jugador.idEquipo2 = this.idEquipo2;
          this.jugadorSrv.crearJugador(this.jugador).pipe(first()).subscribe();});});
          this.cuentaCreada = true;
        
        
    }
  }
  cancelar() {
    this.route.navigate(['/registro-jugador']);
  }
}
