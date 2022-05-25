/**
 * RegistroJugador es un companente que proporciona en el UI un formulario para la creación de las carreras. Utiliza diferentes banderas para poder verificar
 * que los campos requeridos estén completados y que se cumpla con el mínimo de caracteres de los campos que así lo ameritan. Además, proporciona la lógica para
 * evitar que los usuarios traten de crear cuentas con correos ya existentes y verifica que la contraseña sea alfanumerica. Además,
 * permite al usuario cancelar la creación del formulario de creacion de la cuenta en caso de que así lo quiera.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 * 
 */

import { Component, OnInit } from '@angular/core';
import { PAISES } from '@app/_data/paises';
import { Jugador } from '@app/_interfaces/jugador';
import { JugadorService } from '@app/_services/jugador.service';
import { first } from 'rxjs';
import { Router } from '@angular/router';
import { EscuderiasService } from '@app/_services/escuderias.service';

@Component({
  selector: 'app-registro-jugador',
  templateUrl: './registro-jugador.component.html',
  styleUrls: ['./registro-jugador.component.scss']
})
export class RegistroJugadorComponent implements OnInit {

  // Declaración de variables para la asignacion de los valores de los inputs
  nombreUsuario !: string;
  pais!: string;
  correo !: string;
  contrasena !: string;

  // Banderas
  missingNombreUsuario !: boolean;
  missingPais !: boolean;
  missingCorreo !: boolean;
  missingContrasena !: boolean;
  correoInvalido !: boolean;
  contrasenaInvalida !: boolean;
  missingMessage !: boolean;
  letters !: any;
  numbers !: any;
  minLetras !: boolean;
  minNumeros !: boolean;
  correoNoDisponible !: boolean;

  jugador !: Jugador;
  correos : any;
  escuderias : any;

  hide = true;

  // Variable para ser utilizada como insumo del dropdown de países
  listaPaises : any;

  constructor( private jugadorSrv : JugadorService, private route : Router, private escuderiasSrv :  EscuderiasService) { 

    this.listaPaises = PAISES;
    this.letters = /^[a-zA-Z]+$/;
    this.numbers = /^[0-9]+$/;

    this.jugadorSrv.getCorreosUtilizados().pipe(first()).subscribe(response =>
      {this.correos = response;});
  
    this.jugadorSrv.getEscuderiasUtilizadas().pipe(first()).subscribe(response =>
      {this.escuderias = response;});
    
  }

  ngOnInit(): void {
  }

  /**
   * <p> Este método permite verificar que todos los espacios requeridos estén completados y que el espacio 
   * de nombre contenga la cantidad mínima de caracteres requerida. Si las validaciones pasan, se transforman
   * las fechas ingresadas al formato requerido por la base de datos (YYYY-MM-dd) y se hace un llamado al método
   * crearCarrera()</p>
   *  
   */
   validarCamposRequeridos(){
    this.restaurarBanderas();

    if(this.nombreUsuario == null || this.nombreUsuario.length < 1){
      this.missingNombreUsuario = true;
      this.missingMessage = true;
    }
    if(this.pais == null){
      this.missingPais = true;
      this.missingMessage = true;
    }
    if(this.correo == null){
      this.missingCorreo = true;
      this.missingMessage = true;
    }
    else if(!this.correo.includes("@") || this.correo.substring(this.correo.lastIndexOf('@')+1).length < 1){
      this.correoInvalido = true;
    }
    else{
      let despuesArroba = this.correo.substring(this.correo.indexOf('@')+1);
      if (!despuesArroba.includes('.') || despuesArroba.substring(despuesArroba.lastIndexOf('.') +1).length < 1){
        this.correoInvalido = true;
        this.missingMessage = true;
      }
   
    }

    if(this.contrasena == null || this.contrasena.length < 8){
      this.missingContrasena = true;
      this.missingMessage = true;
    }
    else{
      for (let i = 0; i < this.contrasena.length; i++){
        if(/[a-zA-Z]/.test(this.contrasena[i])){
          this.minLetras = true;  
        }
        else if(/[0-9]/.test(this.contrasena[i])){
          this.minNumeros = true;
        }
        else{
          this.contrasenaInvalida = true;
          break;
        }
      }
      
    }

    
    for(let i = 0; i < this.correos.length; i++){
      if (this.correos[i].correo === this.correo){
        
          this.correoNoDisponible = true;
      }
    }

    if(!this.minLetras || !this.minNumeros){
      this.contrasenaInvalida = true;
    }

    if(!(this.missingMessage || this.contrasenaInvalida || this.correoNoDisponible || this.correoInvalido)){
      this.jugador = {nombreUsuario: this.nombreUsuario, correo: this.correo, pais: this.pais, contrasena: this.contrasena, nombreEscuderia: '', idEquipo1: 0, idEquipo2: 0};
      this.jugadorSrv.setJugador(this.jugador);
      this.route.navigate(['/configurar-escuderia']);
    }
  }

   /**
   * <p> Restaura las banderas al valor original que tenían antes de hacer las validaciones </p>
   */
    restaurarBanderas(){
      this.missingNombreUsuario = false;
      this.missingPais = false;
      this.missingCorreo = false;
      this.missingContrasena = false;
      this.correoInvalido = false;
      this.contrasenaInvalida = false;
      this.minLetras = false;
      this.minNumeros = false;
      this.missingMessage = false;
      this.correoNoDisponible = false;
    }

    /**
   * <p> Este método hace un rerouting a la página de visualizacion de los carrerass cuando el usuario quiere cancelar la 
   * creación de una nueva carrera</p>
   *  
   */
  cancelar(){
    window.location.reload();
  }

}
