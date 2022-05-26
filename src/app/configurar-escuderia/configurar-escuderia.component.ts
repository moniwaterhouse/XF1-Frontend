/**
 * Configurar escuderia es un companente que proporciona en el UI un formulario para la creación y configuracion de los equipos. Utiliza diferentes banderas para poder verificar
 * que los campos requeridos estén completados. Además, proporciona la lógica para
 * evitar que los usuarios traten de crear escuderias con nombres de escuderias ya existentes o seleccionen mas de 5 pilotos o mas de 1 escuderia. Además,
 * permite al usuario cancelar la creación de los equipos en caso de que así lo quiera.
 *
 * @author Steven Badilla
 * @version V1.0
 */

import { Component, OnInit } from '@angular/core';
import { EscuderiasService } from '../_services/escuderias.service';
import { PilotosService } from '../_services/pilotos.service';
import { first } from 'rxjs';
import { Escuderia } from '../_interfaces/escuderias';
import { Piloto } from '../_interfaces/pilotos';
import { Jugador } from '@app/_interfaces/jugador';
import { Campeonato } from '../_interfaces/campeonatos';
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
  presupuesto!: number;
  presupuestoE1!: number;
  presupuestoE2!: number;
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


  // variables para manejar que los presupuestos de los equipos no puedan ser menores a 0
  precioEscE1: number = 0;
  precioEscE2: number = 0;

  // Objetos para hacer los posts para la creación de la cuenta de jugador
  equipo1 !: Equipo;
  equipo2 !: Equipo;
  idEquipo1 !: any;
  idEquipo2 !: any;


  constructor(private escuderiasSrv: EscuderiasService, private pilotosSrv: PilotosService, private jugadorSrv: JugadorService, private equipoSrv : EquipoService, private route : Router) { }

  ngOnInit(): void {
    this.escuderiasSrv.getEscuderias().pipe(first()).subscribe(response => { this.escuderias = response; });
    this.escuderiasSrv.getNombresEscuderias().pipe(first()).subscribe(response => { this.nombresEscuderias = response; });
    this.escuderiasSrv.getPresupuesto().pipe(first()).subscribe(response => { this.presupuesto = response[0].presupuesto; this.presupuestoE1 = this.presupuesto; this.presupuestoE2 = this.presupuesto; });
    this.pilotosSrv.getPilotos().pipe(first()).subscribe(response => { this.pilotos = response; });
    this.jugadorSrv.jugadorAux.subscribe((u: Jugador) => { this.jugador = u });
    
  }



  /**
   * <p> Este método permite almacenar la escuderia seleccionada por
   * el usuario desde la interfaz en una variable segun el equipo
   * para el que estuviera seleccioanando ademas
   * llama a la funcion calcPresupuesto() para ectualizar el presupuesto del equipo
   * Entradas: escu de tipo escuderia </p>
   */
  selecEsc(escu: Escuderia) {
    if (this.equipo) {
      this.escuderiaE1 = escu;
      this.precioEscE1 = escu.precio;
      this.calcPresupuesto()
    }
    if (!this.equipo) {
      this.escuderiaE2 = escu;
      this.precioEscE2 = escu.precio;
      this.calcPresupuesto()

    }
  }


  /**
   * <p> Este método permite almacenar el piloto seleccionado por
   * el usuario desde la interfaz en una lista segun el equipo
   * para el que estuviera seleccioanando, en caso de ser un piloto
   * ya seleccionado entonces permite deseleccionarlo, ademas
   * verifica cuando el equipo esta completo para poder evitar la seleccion de mas pilotos
   * y llama a la funcion calcPresupuesto() para ectualizar el presupuesto del equipo
   * Entradas: piloto de tipo Piloto</p>
   */
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
    }
    
  }


  /**
 * <p> Este método permite seleccionar al equipo 1 ademas cambia a la vista de escuderias</p>
 */
  selecEquipo1() {
    if (!this.equipo) {
      this.equipo = true;
      this.escOPil = true;
    }
  }
  /**
* <p> Este método permite seleccionar al equipo 2 ademas cambia a la vista de escuderias</p>
*/
  selecEquipo2() {
  if (this.equipo) {
    this.equipo = false;
    this.escOPil = true;
    }
  }

  /**
* <p> Este método permite cambiar a la vista de escuderias</p>
*/
  selecEscu() {
    if (!this.escOPil) {
      this.escOPil = true;
      }
  }

  /**
* <p> Este método permite cambiar a la vista de pilotos</p>
*/
  selecPiloto() {
    if (this.escOPil) {
      this.escOPil = false;
    }
  }


  /**
  * <p> Este método permite calcular el presupuesto para el equipo seleccionado y almacenarlo en una variable
  * segun los pilotos y la escuderia que haya seleccionado</p>
  */
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

  /**
  * <p> Este método permite verificar si el nombre de la escuderia ya esta tomado
  * mediante una lista con los nombres de las escuderias en la base de datos</p>
  */
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

  /**
 * <p> Este método permite verificar que todos los espacios requeridos estén completados. Si las validaciones pasan, se envian ambos equipos y la informacion de la cuenta del jugador para
 * almacenarla en la base de datos, ademas de cambiar la bandera de la cuenta creada para mostrarlo al usuario</p>
 *
 */
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
    if (!this.pilotosE1completos || this.escuderiaE1 == null ) {
      this.incompletoE1 = true;
    } else { this.incompletoE1 = false; }
    if (!this.pilotosE2completos || this.escuderiaE2 == null ) {
      this.incompletoE2 = true;
    } else { this.incompletoE2 = false; }
    if (!this.faltaNombreEsc && !this.faltaNombreE1 && !this.faltaNombreE2 && !this.incompletoE1 && !this.incompletoE2 && !this.nombreEscTomado) {
      this.equipo1 = { marcaEscuderia: this.escuderiaE1.marca, nombrePiloto1: this.pilotosE1[0].nombre, nombrePiloto2: this.pilotosE1[1].nombre, nombrePiloto3: this.pilotosE1[2].nombre, NombrePiloto4: this.pilotosE1[3].nombre, nombrePiloto5: this.pilotosE1[4].nombre, puntajePublica: 0, costo: this.presupuestoE1 };
      this.equipo2 = { marcaEscuderia: this.escuderiaE2.marca, nombrePiloto1: this.pilotosE2[0].nombre, nombrePiloto2: this.pilotosE2[1].nombre, nombrePiloto3: this.pilotosE2[2].nombre, NombrePiloto4: this.pilotosE2[3].nombre, nombrePiloto5: this.pilotosE2[4].nombre, puntajePublica: 0, costo: this.presupuestoE2 };
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
  /**
* <p> Este método permite en caso de querer cancelar la seleccion
 * volver a la vista de registro de jugador</p>
*/
  cancelar() {
    this.route.navigate(['/registro-jugador']);
  }
}
