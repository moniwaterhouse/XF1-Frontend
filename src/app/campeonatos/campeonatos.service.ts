import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Campeonatos } from './campeonatos';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CampeonatosService {


  constructor(private http: HttpClient) { }

  getCampeonato() {
    return this.http.get<Campeonatos>(`${environment.apiUrl}/Campeonato`);
  }
}
