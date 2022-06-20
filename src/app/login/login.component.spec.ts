import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorService } from '@app/_services/jugador.service';
import { AuthGuardService } from '@app/_services/auth-guard.service';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService = AuthGuardService;
  let jugService = JugadorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [LoginComponent],
      providers: [ AuthGuardService,JugadorService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Las banderas se reinician correctamente', () => {
    component.missingContrasena = true
    component.missingCorreo = true
    component.error = true
    component.correoInvalido = true
    component.contrasenaInvalida = true
    component.restaurarBanderas()
    expect(component.missingContrasena).toBeFalse()
    expect(component.missingCorreo).toBeFalse()
    expect(component.error).toBeFalse()
    expect(component.correoInvalido).toBeFalse()
    expect(component.contrasenaInvalida).toBeFalse()
  });

  it('Detecta si falta el correo', () => {
    component.login()
    expect(component.missingCorreo).toBeTrue()
  });

  it('Detecta si falta la contraseña', () => {
    component.login()
    expect(component.missingContrasena).toBeTrue()
  });

  it('Detecta si el correo es invalido', () => {
    component.login()
    expect(component.correoInvalido).toBeTrue()
  });

  it('Detecta si la contraseña es invalida', () => {
    component.login()
    expect(component.contrasenaInvalida).toBeTrue()
  });

  it('Obtiene los datos correctos', () => {
    component.correo = "prueba@gmail.com"
    component.contrasena = "contraseña"
    component.login()
    expect(component.datos).toEqual({ "correo": "prueba@gmail.com", "contrasena": "contraseña" })
  });

  it('Se valida si es el correo del administrador', () => {
    component.correo = "admin@xfia.com"
    component.contrasena = "hola1234"
    component.login()
    expect(component.missingContrasena).toBeFalse()
    expect(component.missingCorreo).toBeFalse()
    expect(component.error).toBeFalse()
    expect(component.correoInvalido).toBeFalse()
    expect(component.contrasenaInvalida).toBeFalse()
  });
});
