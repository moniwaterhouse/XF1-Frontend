import { Component, OnInit } from '@angular/core';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
import { Router } from '@angular/router';
import { LigasService } from '@app/_services/ligas.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-ranking-privado',
  templateUrl: './liga-privada.component.html',
  styleUrls: ['./liga-privada.component.scss']
})
export class LigaPrivadaComponent implements OnInit {

  puntajes: any;
  usuarios: any;
  info: any;
  nombreUsuario!: string;
  cantidadJugadores : any;
  miembroLiga !: boolean;
  crearLiga !: boolean;
  unirseLiga !: boolean;
  ocultarOpciones !: boolean;

  constructor(private ligasSrv: LigasService, private route: Router) { 
    this.crearLiga = false;
    this.unirseLiga = false;
  }

  ngOnInit(): void {
    this.ligasSrv.getPuntajesPrivada().pipe(first()).subscribe(response => { this.puntajes = response; });
    this.ligasSrv.getMiEscuderia().pipe(first()).subscribe(response => { this.nombreUsuario = response[0].jugador });
    this.ligasSrv.getUsuariosPrivada().pipe(first()).subscribe(response => { this.usuarios = response; });
    this.ligasSrv.getInfoPrivada().pipe(first()).subscribe(response => { this.info = response; });
    this.ligasSrv.getCuentaMiembrosLigaPrivada().pipe(first()).subscribe(response => {this.cantidadJugadores = response; 
                                                                                      if(this.cantidadJugadores.cantidad > 0){
                                                                                        this.miembroLiga = true;
                                                                                      }
                                                                                      else{
                                                                                        this.miembroLiga = false;
                                                                                        this.ocultarOpciones = false;
                                                                                      }});
  }

  mostrarCrearLigaPrivadaForm(){
    this.crearLiga = true;
    this.ocultarOpciones = true;

  }

  mostrarUnirseLigaPrivadaForm(){
    this.unirseLiga = true;
    this.ocultarOpciones = true;
  }

  cancelar(){
    this.crearLiga = false;
    this.unirseLiga = false;
    this.ocultarOpciones = false;
  }


}
