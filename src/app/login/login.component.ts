/**
 * RegistroJugador es un companente que proporciona en el UI un formulario para la creación de las cuentas. Utiliza diferentes banderas para poder verificar
 * que los campos requeridos estén completados y que se cumpla con el mínimo de caracteres de los campos que así lo ameritan. Además, proporciona la lógica para
 * evitar que los usuarios traten de crear cuentas con correos ya existentes y verifica que la contraseña sea alfanumerica. Además,
 * permite al usuario cancelar la creación del formulario de creacion de la cuenta en caso de que así lo quiera.
 * 
 * @author Mónica Waterhouse
 * @version V1.0
 * 
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JugadorService } from '@app/_services/jugador.service';  
import { first } from 'rxjs';
import { DatosLogin } from '@app/_interfaces/jugador';
import { AuthGuardService } from '@app/_services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // Inputs
  correo !: string;
  contrasena !: string;

  // Validaciones
  missingCorreo !: boolean;
  missingContrasena !: boolean;
  correoInvalido !: boolean;
  contrasenaInvalida !: boolean;
  error !: boolean;
  hide = true;

  // Variables usadas con los requests
  correos : any;
  datos !: DatosLogin;
  

  constructor(private jugadorSrv : JugadorService, private route : Router, private auth : AuthGuardService) { }

  ngOnInit(): void {

    this.restaurarBanderas();

    this.jugadorSrv.getCorreosUtilizados().pipe(first()).subscribe(response =>
      {this.correos = response;});
  }

  login(){
    this.restaurarBanderas();

    if(this.correo == null || this.correo.length < 1){
      this.missingCorreo = true;
    }

    if(this.contrasena == null || this.contrasena.length < 8){
      this.missingContrasena = true;
    }

    if(!this.missingContrasena && !this.missingCorreo){
      this.auth.setCorreo(this.correo);
      this.datos = {correo : this.correo, contrasena : this.contrasena};
      this.jugadorSrv.login(this.datos).pipe(first()).subscribe(
        response => {
         
          this.route.navigate(['/ranking-publico']);
        }, 
        error =>{
          if (error.status == 409){
            this.correoInvalido = true;
          }
          else if(error.status == 401){
            this.contrasenaInvalida = true;
          }
          else{
            this.error = true;
          }
        })
    }
    
  }

  restaurarBanderas(){
    this.missingCorreo = false;
    this.missingContrasena = false;
    this.correoInvalido = false;
    this.contrasenaInvalida = false;
    this.error = false;
  }

}
