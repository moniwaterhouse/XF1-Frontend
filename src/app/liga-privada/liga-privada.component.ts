/**
 * LigaPrivada es un componente que le permite al jugador observar el ranking de la liga privada a la que pertenece y si no pertenece a ninguna
 * le brinda la opción de poder crear una liga privada o unirse a una ya existente, esto último mendiante diferentes banderas que controlan los componentes 
 * del html y validaciones que permiten verificar que la información ingresada esté correcta para así hacer los requests correspondientes al backend.
 * 
 * @author Mónica Waterhouse, Steven Badilla
 * @version V1.0
 * 
 */

import { Component, OnInit } from '@angular/core';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';
import { LigaPrivada } from '@app/_interfaces/liga-privada';

@Component({
  selector: 'app-ranking-privado',
  templateUrl: './liga-privada.component.html',
  styleUrls: ['./liga-privada.component.scss']
})
export class LigaPrivadaComponent implements OnInit {

  // Si esta variable es 0, se indica que el jugador no pertenece a una liga privada.
  cantidadJugadores : any;
  
  // Variables relacionadas al ranking de la liga privada
  puntajes: any;
  usuarios: any;
  info: any;
  nombreUsuario!: string;
  
  // Variables relacionadas con el manejo de las  opciones de crear o unirse a una liga privada
  crearLiga !: boolean;
  unirseLiga !: boolean;
  miembroLiga !: boolean;
  ocultarOpciones !: boolean;
 
  // Variables relacionadas a la creación de una liga privada.
  missingName !: boolean;
  correoJugador !: string;
  nuevaLigaPrivada !: LigaPrivada;
  nombreLiga !: string;

  constructor(private ligasSrv: LigasService, private route: Router) { 
    this.crearLiga = false;
    this.unirseLiga = false;
    this.correoJugador = this.ligasSrv.correo;

  }

  ngOnInit(): void {
    this.ligasSrv.getPuntajesPrivada().pipe(first()).subscribe(response => { this.puntajes = response; });
    this.ligasSrv.getMiEscuderia().pipe(first()).subscribe(response => { this.nombreUsuario = response[0].jugador });
    this.ligasSrv.getUsuariosPrivada().pipe(first()).subscribe(response => { this.usuarios = response; });
    this.ligasSrv.getInfoPrivada().pipe(first()).subscribe(response => { this.info = response; });

    // Verifica si el jugador pertenece o no a una liga privada y setea la bandera respectiva para mostrar el ranking de la liga o permitirle crear o unirse a una.
    this.ligasSrv.getCuentaMiembrosLigaPrivada().pipe(first()).subscribe(response => {this.cantidadJugadores = response; 
                                                                                      if(this.cantidadJugadores.cantidad > 0){
                                                                                        this.miembroLiga = true;
                                                                                      }
                                                                                      else{
                                                                                        this.miembroLiga = false;
                                                                                        this.ocultarOpciones = false;
                                                                                      }});
  }

  /**
   * Controla las banderas para mostrar solamente el form de crear una liga privada
   */
  mostrarCrearLigaPrivadaForm(){
    this.crearLiga = true;
    this.ocultarOpciones = true;

  }

  /**
   * Controla las banderas para mostrar solamente el form de unirse a una liga privada
   */
  mostrarUnirseLigaPrivadaForm(){
    this.unirseLiga = true;
    this.ocultarOpciones = true;
  }

  /**
   * Se devuelve al menú de opciones de crear o unirse a un aliga privada
   */
  cancelar(){
    this.crearLiga = false;
    this.unirseLiga = false;
    this.ocultarOpciones = false;
  }

  /**
   * Valida el nombre de la liga privada y llama al servicio que crea una nueva liga privada.
   */
  formarLiga(){
    this.nuevaLigaPrivada = {nombre : this.nombreLiga, correo : this.correoJugador.slice(1, -1)};
    if(this.nombreLiga == null || this.nombreLiga.length < 1){
      this.missingName = true;
    }
    else{
      console.log(this.correoJugador);
      this.ligasSrv.crearLigaPrivada(this.nuevaLigaPrivada).pipe(first()).subscribe(response => {window.location.reload();});
    }
  }


}
