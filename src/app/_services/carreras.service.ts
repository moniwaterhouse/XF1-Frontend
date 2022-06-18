/**
 * CarrerasService brinda las funciones para hacer los http requests a la base de datos de los datos relacionados con las carreras.
 * @author Mónica Waterhouse
 * @version V1.0
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carrera } from '../_interfaces/carreras'
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {

  constructor(private http: HttpClient) { }

  getCarreras() {
    return this.http.get<Carrera[]>(`${environment.apiUrl}/Carrera/NombreCampeonato`);
  }

  crearCarrera(carrera : Carrera){
    return this.http.post(`${environment.apiUrl}/Carrera`, carrera);
  }

  getFechasUtilizadas(id : string){
    return this.http.get(`${environment.apiUrl}/Carrera/Fechas/${id}`);
  }

  subirResultados(resultados: JSON[]) {
    return this.http.post(`${environment.apiUrl}/Puntaje`, resultados);
  }

}
