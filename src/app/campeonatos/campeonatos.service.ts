import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Campeonatos } from './campeonatos';

@Injectable({
  providedIn: 'root'
})
export class CampeonatosService {
  

  campeonatosUrl = 'http://localhost:5000/api/Campeonato'

  constructor(private http: HttpClient) { }

  getCampeonato() {
    return this.http.get<Campeonatos>(this.campeonatosUrl);
  }
}
