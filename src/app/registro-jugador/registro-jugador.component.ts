import { Component, OnInit } from '@angular/core';
import { Jugador } from '@app/_interfaces/jugador';
import { UsuarioService } from '@app/_services/usuario';
import { first } from 'rxjs';

@Component({
  selector: 'app-registro-jugador',
  templateUrl: './registro-jugador.component.html',
  styleUrls: ['./registro-jugador.component.scss']
})
export class RegistroJugadorComponent implements OnInit {

  jugador !: Jugador;
  correos : any;
  escuderias : any;

  constructor( private usuarioSrv : UsuarioService ) { 
    this.jugador = {nombreUsuario:"IgnacioGranados", correo: "ignaciog@gmail.com", pais: "Costa Rica", contrasena: "123ABC", nombreEscuderia: "Granados", idEquipo1: 5, idEquipo2: 6};

    this.usuarioSrv.crearJugador(this.jugador).pipe(first()).subscribe();

    this.usuarioSrv.getCorreosUtilizados().pipe(first()).subscribe(response =>
      {this.correos = response;
      console.log(this.correos)});
  
      this.usuarioSrv.getEscuderiasUtilizadas().pipe(first()).subscribe(response =>
        {this.escuderias = response;
        console.log(this.escuderias)});
  }

  ngOnInit(): void {
  }

}
