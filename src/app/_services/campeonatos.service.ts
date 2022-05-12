/**
 * CampeonatosService brinda las funciones para hacer los http requests a la base de datos de los datos relacionados con los campeonatos.
 * @author Mónica Waterhouse
 * @version V1.0
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Campeonato} from '../_interfaces/campeonatos'
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CampeonatosService {

  //public campeonato!: Observable<Campeonato>;
  //private campeonatoSubject!: BehaviorSubject<Campeonato>;

  constructor(private http: HttpClient, private router: Router) { 
        //this.campeonatoSubject = this.campeonatoSubject.asObservable();
        //this.campeonatosUB = new BehaviorSubject<Campeonato>(JSON.parse(localStorage.getItem('account')));
        
  }

  getCampeonatos() {
    return this.http.get<Campeonato[]>(`${environment.apiUrl}/Campeonato`);
  }

  crearCampeonato(campeonato : Campeonato){
    return this.http.post(`${environment.apiUrl}/Campeonato`, campeonato);
  }

  getFechasUtilizadas(){
    return this.http.get(`${environment.apiUrl}/Campeonato/Fechas`);
  }
}
