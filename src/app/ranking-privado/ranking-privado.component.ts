import { Component, OnInit } from '@angular/core';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-ranking-privado',
  templateUrl: './ranking-privado.component.html',
  styleUrls: ['./ranking-privado.component.scss']
})
export class RankingPrivadoComponent implements OnInit {

  puntajes: any;
  usuarios: any;
  info: any;
  nombreUsuario!: string;
  constructor(private ligasSrv: LigasService, private route: Router) { }

  ngOnInit(): void {
    this.ligasSrv.getPuntajesPrivada().pipe(first()).subscribe(response => { this.puntajes = response; });
    this.ligasSrv.getMiEscuderia().pipe(first()).subscribe(response => { this.nombreUsuario = response[0].jugador });
    this.ligasSrv.getUsuariosPrivada().pipe(first()).subscribe(response => { this.usuarios = response; });
    this.ligasSrv.getInfoPrivada().pipe(first()).subscribe(response => { this.info = response; });
  }


}
