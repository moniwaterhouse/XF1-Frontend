import { Component, OnInit } from '@angular/core';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';
import { JugadorService } from '@app/_services/jugador.service';

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
  

  constructor(private ligasSrv: LigasService, private route: Router) { }

  ngOnInit(): void {
    this.ligasSrv.getUsuariosPublica().pipe(first()).subscribe(response => { this.usuarios = response;});
    this.ligasSrv.getMiEscuderia().pipe(first()).subscribe(response => { this.miEscuderia = response; this.nombreMiEscuderia = response[0].escuderia; this.nombreUsuario = response[0].jugador });
  }

  verPerfil(correo: string) {
    console.log(correo)
  }
}
