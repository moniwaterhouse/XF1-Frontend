import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JugadorService } from '@app/_services/jugador.service';
import { EscuderiasService } from '@app/_services/escuderias.service';
import { RegistroJugadorComponent } from './registro-jugador.component';
import { ConfigurarEscuderiaComponent } from '@app/configurar-escuderia/configurar-escuderia.component';

describe('RegistroJugadorComponent', () => {
  let component: RegistroJugadorComponent;
  let fixture: ComponentFixture<RegistroJugadorComponent>;

  let jugadorService: JugadorService;
  let escuderiaService: EscuderiasService;

  beforeEach(async () => {
    window.onbeforeunload = () => 'Oh no!';
    await TestBed.configureTestingModule({
      declarations: [RegistroJugadorComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([{ path: 'configurar-escuderia', component: ConfigurarEscuderiaComponent }])],
      providers: [JugadorService, EscuderiasService]
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


    it('Verifica si falta el nombre de usuario', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    expect(component.missingNombreUsuario).toBeTrue();
  });
   
  it('Verifica si falta el pais', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    expect(component.missingPais).toBeTrue();
  });

  it('Verifica si falta el correo', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    expect(component.missingCorreo).toBeTrue();
  });

  it('Verifica si falta la contraseña', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    expect(component.missingContrasena).toBeTrue();
  });

  it('Verifica el comportamiento correcto de la bandera missingMessage', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    expect(component.missingMessage).toBeTrue();
  });
   
  it('Verifica que no se permitan correos ya registrados', () => {
    component.correos = [{ "correo": "prueba@gmail.com" }]
    component.correo = "prueba@gmail.com"
    component.validarCamposRequeridos()
    expect(component.correoNoDisponible).toBeTrue();
  });

  it('Verifica que el correo contenga un @', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.correo = "pruebagmail.com"
    component.validarCamposRequeridos()
    expect(component.correoInvalido).toBeTrue();
  });

  it('Verifica que el correo contenga informacion luego del @', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.correo = "prueba@"
    component.validarCamposRequeridos()
    expect(component.correoInvalido).toBeTrue();
  });

  it('Verifica que el correo contenga un . despues del @', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.correo = "prueba@gmailcom"
    component.validarCamposRequeridos()
    expect(component.correoInvalido).toBeTrue();
  });

  it('Verifica que el correo contenga infromacion despues del .', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.correo = "prueba@gmail."
    component.validarCamposRequeridos()
    expect(component.correoInvalido).toBeTrue();
  });


  it('Verifica que el correo contenga infromacion despues del .', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.correo = "prueba@gmail."
    component.validarCamposRequeridos()
    expect(component.correoInvalido).toBeTrue();
  });

  

  it('Verifica que la contraseña sea de 8 caracteres', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.contrasena = "1234567"
    component.validarCamposRequeridos()
    expect(component.missingContrasena).toBeTrue();
  });

  it('Verifica que la contraseña contenga al menos 1 letra', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.contrasena = "12345678"
    component.validarCamposRequeridos()
    expect(component.minLetras).toBeFalse();
  });

  it('Verifica que la contraseña contenga al menos 1 numero', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.contrasena = "abcdefgh"
    component.validarCamposRequeridos()
    expect(component.minNumeros).toBeFalse();
  });
    
  it('Verifica que las banderas se restauran correctamente', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.validarCamposRequeridos()
    component.restaurarBanderas()
    expect(component.missingNombreUsuario).toBeFalse();
    expect(component.missingPais).toBeFalse();
    expect(component.missingCorreo).toBeFalse();
    expect(component.missingContrasena).toBeFalse();
    expect(component.missingMessage).toBeFalse();
    expect(component.correoInvalido).toBeFalse();
    expect(component.correoNoDisponible).toBeFalse();
    expect(component.contrasenaInvalida).toBeFalse();
    expect(component.minLetras).toBeFalse();
    expect(component.minNumeros).toBeFalse();
  });
 
 /**
  it('Verifica que el jugador se cree correctamente', () => {
    component.correos = [{ "correo": "prueba1@gmail.com" }]
    component.nombreUsuario = "Prueba"
    component.correo = "prueba@gmail.com"
    component.pais = "Argentina"
    component.contrasena = "abcde123"
    component.validarCamposRequeridos()
    expect(component.jugador).toEqual({ "nombreUsuario": "Prueba", "correo": "prueba@gmail.com", "pais": "Argentina", "contrasena": "abcde123", "nombreEscuderia": "", "idEquipo1": 0, "idEquipo2": 0 });
  });
  */
});
