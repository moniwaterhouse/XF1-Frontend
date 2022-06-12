import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
import { LigaPrivada, LigaPrivadaId } from '@app/_interfaces/liga-privada';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LigasService {

  correo: string = '\'juan@gmail.com\''

  constructor(private http: HttpClient, private router: Router) { }

  getUsuariosPublica() {
    return this.http.get<UsuarioLiga[]>(`${environment.apiUrl}/Liga/PuntajesPublica`);
  }

  getMiEscuderia() {
    return this.http.get<UsuarioLiga[]>(`${environment.apiUrl}/Liga/PuntajesPublica/` + this.correo );
  }

  getInfoPrivada() {
    return this.http.get<any>(`${environment.apiUrl}/Liga/InfoPrivada/` + this.correo);
  }

  getPuntajesPrivada() {
    return this.http.get<UsuarioLiga[]>(`${environment.apiUrl}/Liga/PuntajesPrivada/` + this.correo);
  }

  getUsuariosPrivada() {
    return this.http.get <any[]>(`${environment.apiUrl}/Liga/UsuariosLiga/` + this.correo);
  }

  getCuentaMiembrosLigaPrivada(){
    return this.http.get<number>(`${environment.apiUrl}/Liga/CantidadJugador/` + this.correo);
  }

  getLigasPrivadas(){
    return this.http.get<any[]>(`${environment.apiUrl}/Liga/IdPrivadas/`);
  }

  getCantidadMiembrosLigaPrivada(llavePrivada : string){
    return this.http.get<any>(`${environment.apiUrl}/Liga/CantidadJugadorPorId/` + "'" + llavePrivada + "'");
  }

  anadirMiembroLigaPrivada(ligaPrivada : LigaPrivadaId){
    return this.http.put(`${environment.apiUrl}/Liga`, ligaPrivada);
  }

  crearLigaPrivada(nuevaLiga : LigaPrivada){
    return this.http.post(`${environment.apiUrl}/Liga`, nuevaLiga);
  }


}
