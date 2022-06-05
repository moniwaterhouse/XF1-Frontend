import { Component, OnInit } from '@angular/core';
import { JugadorService } from '@app/_services/jugador.service';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-perfil-jugador',
  templateUrl: './perfil-jugador.component.html',
  styleUrls: ['./perfil-jugador.component.scss']
})
export class PerfilJugadorComponent implements OnInit {

  correo !: string;
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

  constructor(private jugadorSrv : JugadorService, private ligasSrv: LigasService) { }

  ngOnInit(): void {
    this.correo = "juan@gmail.com";
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
