import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from '@app/_interfaces/equipo';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private http: HttpClient) { }

  crearEquipo(equipo : Equipo){
    return this.http.post(`${environment.apiUrl}/Equipo`, equipo);
  }
}
