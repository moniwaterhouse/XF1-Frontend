/**
 * UsuariosService brinda las funciones para hacer los http requests a la base de datos de los datos relacionados con la creación de una cuenta de jugador.
 * @author Mónica Waterhouse
 * @version V1.0
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CorreoJugador, DatosLogin, Jugador } from '@app/_interfaces/jugador';
import { environment } from '@environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  jugador !: Jugador;
  jugadorAux: BehaviorSubject<Jugador> = new BehaviorSubject(this.jugador);

  correoPerfil !: string;
  correoPerfilAux : BehaviorSubject<string> = new BehaviorSubject(this.correoPerfil);

  correo !: string;
  correoAux : BehaviorSubject<string> = new BehaviorSubject(this.correo);

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

  getPerfil(correo : string){
    return this.http.get(`${environment.apiUrl}/Usuario/Perfil/` + "'" + correo + "'");
  }

  abadonarLiga(correo : CorreoJugador){
    return this.http.put(`${environment.apiUrl}/Usuario/Abandonar`, correo);
  }

  login(datos : DatosLogin){
    return this.http.post(`${environment.apiUrl}/Usuario/Login`, datos, {observe: 'response'});
  }

  setJugador(jugador : Jugador){

    this.jugador = jugador;
    this.jugadorAux.next(this.jugador);

  }

  /**
   * Esta función permite compartir el correo seleccionado en las tablas de ranking para poder ser compartido entre componentes.
   * @param correo es el correo seleccionado en la tablas de rankings para poder ser usado para ir al perfil de ese jugador
   */
  setCorreoPerfil(correo : string){
    this.correoPerfil = correo;
    this.correoPerfilAux.next(this.correoPerfil);
  }

  
}
