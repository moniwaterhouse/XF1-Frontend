import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escuderia } from '../_interfaces/escuderias'
import { Campeonato } from '../_interfaces/campeonatos'
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EscuderiasService {

  constructor(private http: HttpClient, private router: Router) { }

  getEscuderias() {
    return this.http.get<Escuderia[]>(`${environment.apiUrl}/Escuderia`);
  }

  getNombresEscuderias() {
    return this.http.get<string[]>(`${environment.apiUrl}/Usuario/Escuderias`)
  }

  getPresupuesto() {
    return this.http.get<Campeonato[]>(`${environment.apiUrl}/Campeonato`)
  }

}
