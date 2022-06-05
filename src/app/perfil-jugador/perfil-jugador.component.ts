/**
 * PerfilJugador es un componente que permite visualizar el perfil del jugador, el cual inclute el nombre de usuario, el país al que pertenece
 * cuál es el nombre de su escudería, cuál es el nombre de sus equipos y para cada uno de estos último se muestra la posición en el raking público,
 * la cantidad de puntos que tienen hasta el momento así como el nombre de la escudería y pilotos que conforman cada uno.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorService } from '@app/_services/jugador.service';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.scss']
})
export class PerfilJugadorComponent implements OnInit {

  // Variables relacionadas con los datos a mostrar en la página del perfil
  correo !: string;
  correoLogueado !: string;
  nombreUsuarioLogueado !: string;
  nombreUsuarioPerfil !: string;
  pais !: string;
  nombreEscuderia !: string;
  perfil : any;
  equipo1 : any;
  equipo2 : any;
  posEquipo1 : any;
  posEquipo2 : any;
  puntajeEquipo1 : any;
  puntajeEquipo2 : any;
  

  constructor(private jugadorSrv : JugadorService, private ligasSrv: LigasService, private route: Router) { 
    this.correoLogueado = this.ligasSrv.correo;
  }

  ngOnInit(): void {
    
    this.jugadorSrv.correoPerfilAux.subscribe((u: string) => { this.correo = u });
    this.ligasSrv.getMiEscuderia().pipe(first()).subscribe(response => { 
      this.nombreUsuarioLogueado = response[0].jugador;
      this.posEquipo1 = response[0].posicion;
      this.posEquipo2 = response[1].posicion;
      this.puntajeEquipo1 = response[0].puntos;
      this.puntajeEquipo2 = response[1].puntos});
      this.jugadorSrv.getPerfil(this.correo).pipe(first()).subscribe(response => { 
      this.perfil = response; 
      this.equipo1 = this.perfil[0]; 
      this.equipo2 = this.perfil[1];
      this.nombreUsuarioPerfil = this.equipo1.nombreUsuario;
      this.pais = this.equipo1.pais;
      this.nombreEscuderia = this.equipo1.nombreEscuderia;
    });
  }

}
