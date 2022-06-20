import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  correo !: string;
  correoAux : BehaviorSubject<string> = new BehaviorSubject(this.correo);

  constructor() { }

  setCorreo(correo : string){
    this.correo = correo;
    this.correoAux.next(this.correo);
  }
}
