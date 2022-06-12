import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Piloto } from '../_interfaces/pilotos'
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PilotosService {

  constructor(private http: HttpClient, private router: Router) { }

  getPilotos() {
    return this.http.get<Piloto[]>(`${environment.apiUrl}/Piloto`);
  }
}
