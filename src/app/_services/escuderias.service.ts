import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escuderia } from '../_interfaces/escuderias'
import { environment } from '@environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscuderiasService {

  user:string = "";

  userAux: BehaviorSubject<string> = new BehaviorSubject(this.user);


  constructor(private http: HttpClient, private router: Router) { }

  getEscuderias() {
    return this.http.get<Escuderia[]>(`${environment.apiUrl}/Escuderia`);
  }

  getNombresEscuderias() {
    return this.http.get<string[]>(`${environment.apiUrl}/Usuario/Escuderias`)
  }

  setUser(user:string){

    this.user = user;

    this.userAux.next(this.user);

  }
}
