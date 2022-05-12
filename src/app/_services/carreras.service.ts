import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Carrera } from '../_interfaces/carreras'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http: HttpClient, private router: Router) { }

  getCarreras() {
    return this.http.get<Carrera[]>(`${environment.apiUrl}/Carrera`);
  }

  crearCarrera(carrera : Carrera){
    return this.http.post(`${environment.apiUrl}/Carrera`, carrera);
  }

  getFechasUtilizadas(id : string){
    return this.http.get(`${environment.apiUrl}/Campeonato/Fechas/${id}`);
  }

  getListaPaises(){
    return this.http.get(`http://country.io/names.json`);
  }

}
