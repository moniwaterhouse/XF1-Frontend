import { Component, OnInit } from '@angular/core';
import { EscuderiasService } from '../_services/escuderias.service';
import { PilotosService } from '../_services/pilotos.service';
import { first } from 'rxjs';
import { Escuderia } from '../_interfaces/escuderias';
import { Piloto } from '../_interfaces/pilotos';

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

  constructor(private escuderiasSrv: EscuderiasService, private pilotosSrv: PilotosService) { }

  ngOnInit(): void {
    this.escuderiasSrv.getEscuderias().pipe(first()).subscribe(response => { this.escuderias = response; });
    this.escuderiasSrv.getNombresEscuderias().pipe(first()).subscribe(response => { this.nombresEscuderias = response; });
    this.pilotosSrv.getPilotos().pipe(first()).subscribe(response => { this.pilotos = response; });

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
      if (this.escuderiaE1 != null)
        paux = paux + this.escuderiaE1.precio;
      this.presupuestoE1 = this.presupuesto - paux;
    }
    if (!this.equipo) {
      for (let i of this.pilotosE2) {
        paux = paux + i.precio;
      }
      if (this.escuderiaE2 != null)
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
      console.log("Cuenta creada")
    }
  }
  cancelar() {

  }
}
