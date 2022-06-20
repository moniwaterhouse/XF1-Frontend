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
import { CorreoJugador } from '@app/_interfaces/jugador';
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';
import { LigaPrivada, LigaPrivadaId } from '@app/_interfaces/liga-privada';
import { JugadorService } from '@app/_services/jugador.service';
import { AuthGuardService } from '@app/_services/auth-guard.service';

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
  correoJson !: CorreoJugador;
  
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

  // Variables relacionadas con unirse a una liga privada
  ligaPrivadaId !: LigaPrivadaId;
  missingLlave !: boolean;
  llavePrivada !: string;
  ligasCreadas : any;
  llaveErronea !: boolean;
  limiteAlcanzado !: boolean;
  cantidadMiembros : any;

  constructor(private ligasSrv: LigasService, private route: Router, private jugadorSrv : JugadorService, private auth : AuthGuardService) { 
    this.crearLiga = false;
    this.unirseLiga = false;
    this.auth.correoAux.subscribe((u: string) => { this.correoJugador = u });

    if(this.correoJugador == "" || this.correoJugador == null){
      this.route.navigate(['/']);
    }
    

  }

  ngOnInit(): void {
    

    // Llamado al serivicio de ligas para creación de lógica de visualización del ranking privado
    this.ligasSrv.getPuntajesPrivada(this.correoJugador).pipe(first()).subscribe(response => { this.puntajes = response; });
    this.ligasSrv.getMiEscuderia(this.correoJugador).pipe(first()).subscribe(response => { this.nombreUsuario = response[0].jugador });
    this.ligasSrv.getUsuariosPrivada(this.correoJugador).pipe(first()).subscribe(response => { this.usuarios = response; });
    this.ligasSrv.getInfoPrivada(this.correoJugador).pipe(first()).subscribe(response => { this.info = response; });

    // Verifica si el jugador pertenece o no a una liga privada y setea la bandera respectiva para mostrar el ranking de la liga o permitirle crear o unirse a una.
    this.ligasSrv.getCuentaMiembrosLigaPrivada(this.correoJugador).pipe(first()).subscribe(response => {this.cantidadJugadores = response; 
                                                                                      if(this.cantidadJugadores.cantidad > 0){
                                                                                        this.miembroLiga = true;
                                                                                      }
                                                                                      else{
                                                                                        this.miembroLiga = false;
                                                                                        this.ocultarOpciones = false;
                                                                                      }});
    
    this.ligasSrv.getLigasPrivadas().pipe(first()).subscribe(response => { this.ligasCreadas = response});
    this.resetLlaves();
    

    
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
    this.nuevaLigaPrivada = {nombre : this.nombreLiga, correo : this.correoJugador};
    if(this.nombreLiga == null || this.nombreLiga.length < 1){
      this.missingName = true;
    }
    else{
      this.ligasSrv.crearLigaPrivada(this.nuevaLigaPrivada).pipe(first()).subscribe(response => {this.ngOnInit()});
    }
  }

  unirseLigaPrivada(){

    this.resetLlaves();

    if(this.llavePrivada == null || this.llavePrivada.length < 1){
      this.missingLlave = true;
    }
    else{
      this.ligaPrivadaId = {id : this.llavePrivada, correo : this.correoJugador};
      for(let i = 0; i < this.ligasCreadas.length; i++){
        if(this.ligasCreadas[i].id == this.llavePrivada){
          this.ligasSrv.getCantidadMiembrosLigaPrivada(this.llavePrivada).pipe(first()).subscribe(response => { this.cantidadMiembros = response.cantidad;
                                                                                                              if(this.cantidadMiembros > 38){
                                                                                                                this.limiteAlcanzado = true;
                                                                                                              }
                                                                                                            else{
                                                                                                              this.ligasSrv.anadirMiembroLigaPrivada(this.ligaPrivadaId).pipe(first()).subscribe(response=>{this.ngOnInit()});
                                                                                                              
                                                                                                            }});
                                                                                                            
        }
        
        else{
          this.llaveErronea = true;
        }
        
      }
      
    }
  }

  resetLlaves(){
    this.missingLlave = false;
    this.llaveErronea = false;
    this.limiteAlcanzado = false;
  }


  /**
   * Esta función conduce al perfil de jugador cuyo perfil se quiere visualizar.
   * @param correo es el correo del usuario a revisar el perfil
   */
  verPerfil(correo : string) {
    this.jugadorSrv.setCorreoPerfil(correo);
    this.route.navigate(['/perfil-jugador']);

    
  }

  abandonarLigaPrivada(){
    this.correoJson = {"correo" :  this.correoJugador};
    this.jugadorSrv.abadonarLiga(this.correoJson).pipe(first()).subscribe(response => {this.ngOnInit()});

  }


}
