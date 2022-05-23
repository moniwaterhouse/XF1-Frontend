/**
 * UsuariosService brinda las funciones para hacer los http requests a la base de datos de los datos relacionados con la creación de una cuenta de jugador.
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from '@app/_interfaces/jugador';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

  crearJugador(jugador : Jugador){
    return this.http.post(`${environment.apiUrl}/Usuario`, jugador);
  }

  getCorreosUtilizados(){
    return this.http.get(`${environment.apiUrl}/Usuario/Correos`);
  }

  getEscuderiasUtilizadas(){
    return this.http.get(`${environment.apiUrl}/Usuario/Escuderias`);
  }
}
