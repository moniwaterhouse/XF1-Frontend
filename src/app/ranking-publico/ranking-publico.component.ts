import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';
import { JugadorService } from '@app/_services/jugador.service';
import { AuthGuardService } from '@app/_services/auth-guard.service';

@Component({
  selector: 'app-ranking-publico',
  templateUrl: './ranking-publico.component.html',
  styleUrls: ['./ranking-publico.component.scss']
})
export class RankingPublicoComponent implements OnInit {


  usuarios: any;
  miEscuderia: any;
  nombreMiEscuderia!: string;
  nombreUsuario!: string;
  correoJugador !: string;

  esAdmin !: boolean;
  esJugador !: boolean;
  

  constructor(private ligasSrv: LigasService, private route: Router, private jugadorSrv : JugadorService, private auth : AuthGuardService) { 
    this.auth.correoAux.subscribe((u: string) => { this.correoJugador = u });

    if(this.correoJugador == "" || this.correoJugador == null){
      this.route.navigate(['/']);
    }
    else if(this.correoJugador == "admin@xfia.com"){
      this.esAdmin = true;
    }
    else{
      this.esJugador = true;
    }
  }

  ngOnInit(): void {
    
    this.ligasSrv.getUsuariosPublica().pipe(first()).subscribe(response => { this.usuarios = response;});
    this.ligasSrv.getMiEscuderia(this.correoJugador).pipe(first()).subscribe(response => { this.miEscuderia = response; this.nombreMiEscuderia = response[0].escuderia; this.nombreUsuario = response[0].jugador });
  }

  /**
   * Esta función conduce al perfil de jugador cuyo perfil se quiere visualizar.
   * @param correo es el correo del usuario a revisar el perfil
   */
  verPerfil(correo: string) {
    this.jugadorSrv.setCorreoPerfil(correo);
    this.route.navigate(['/perfil-jugador']);
  }

}
