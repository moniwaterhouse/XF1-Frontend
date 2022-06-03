import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioLiga } from '../_interfaces/usuario-liga'
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

}
