import { Component, OnInit } from '@angular/core';

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
  escuderiaE1!: string;
  escuderiaE2!: string;
  pilotosE1: Array<string> = [];
  pilotosE2: Array<string> = [];

  // Variable para seleccionar entre equipos, si es verdadera es equipo 1 si es falsa es equipo 2
  equipo: boolean = true;
  // Variable para seleccionar entre escuderias o pilotos, si es verdadera son escuderias si es falsa son pilotos
  escOPil: boolean = true;

  presupuesto: number = 100;
  presupuestoE1: number = this.presupuesto;
  presupuestoE2: number = this.presupuesto;
  escuderias: Array<string> = ["Ferrari", "Mercedez", "Bmw", "Toyota", "Suzuki","Lambo","Nisan","KIA"];
  pilotos: Array<string> = ["Paco", "Pedro", "Juan", "Carlos", "Marco","Jorge","Alonso"];
  presupuestospilots: Array<number> = []
  presupuestoesc: number = 0;

  // Banderas para validar la informacion ingresada
  faltaNombreEsc: boolean = false;
  faltaNombreE1: boolean = false;
  faltaNombreE2: boolean = false;
  incompletoE1: boolean = false;
  incompletoE2: boolean = false;

  pilotosE1completos: boolean = false;
  pilotosE2completos: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }


  selecEsc(escu: string) {
    if (this.equipo) {
      this.escuderiaE1 = escu;
      this.presupuestoesc = this.presupuestoesc + 10;
      this.calcPresupuesto()
    }
    if (!this.equipo) {
      this.escuderiaE2 = escu;
      this.presupuestoesc = this.presupuestoesc + 10;
      this.calcPresupuesto()
    }
    console.log(this.escuderiaE1)
  }

  selecPilotos(piloto: string) {
    if (this.equipo) {
      if (this.pilotosE1.includes(piloto)) {
        this.pilotosE1 = this.pilotosE1.filter(item => item != piloto)
        this.presupuestospilots.pop()
      }
      else {
        this.presupuestospilots.push(10)
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
        this.presupuestospilots.pop()
      }
      else {
        this.presupuestospilots.push(10)
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
      for (let i of this.presupuestospilots) {
        paux = paux + i;
      }
      paux = paux + this.presupuestoesc;
      this.presupuestoE1 = this.presupuesto - paux;
    }
    if (!this.equipo) {
      for (let i of this.presupuestospilots) {
        paux = paux + i;
      }
      paux = paux + this.presupuestoesc;
      this.presupuestoE2 = this.presupuesto - paux;
    }
  }
  validarCamposRequeridos() {
    if (this.nombreEsc == null || this.nombreEsc == "") {
      this.faltaNombreEsc = true;
    } else { this.faltaNombreEsc = false}
    if (this.nombreE1 == null) {
      this.faltaNombreE1 = true;
    } else { this.faltaNombreE1 = false;}
    if (this.nombreE2 == null) {
      this.faltaNombreE2 = true;
    } else { this.faltaNombreE2 = false;}
    if (!this.pilotosE1completos || this.escuderiaE1 == null) {
      this.incompletoE1 = true;
    } else { this.incompletoE1 = false;}
    if (!this.pilotosE2completos || this.escuderiaE2 == null) {
      this.incompletoE2 = true;
    } else { this.incompletoE2 = false;}
  }
  cancelar() {

  }
}
