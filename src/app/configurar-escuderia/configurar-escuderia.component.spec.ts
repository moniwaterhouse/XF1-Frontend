import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfigurarEscuderiaComponent } from './configurar-escuderia.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EscuderiasService } from '../_services/escuderias.service';
import { RouterModule } from '@angular/router';
import { PilotosService } from '../_services/pilotos.service';
import { Escuderia } from '../_interfaces/escuderias';
import { Piloto } from '../_interfaces/pilotos';

describe('ConfigurarEscuderiaComponent', () => {
  let component: ConfigurarEscuderiaComponent;
  let fixture: ComponentFixture<ConfigurarEscuderiaComponent>;

  let escService = EscuderiasService;
  let pilService = PilotosService;

  beforeEach(async () => {



    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ConfigurarEscuderiaComponent],
      providers: [EscuderiasService, PilotosService]
    })
    .compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarEscuderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pilService = TestBed.get(PilotosService)
    escService = TestBed.get(EscuderiasService)
  });

  it('Verifica que se crea el componente', () => {
    fixture = TestBed.createComponent(ConfigurarEscuderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("Verifica cuando no hay nombre de escuderia", () => {
    component.nombresEscuderias = []
    component.validarCamposRequeridos()
    expect(component.faltaNombreEsc).toBeTrue();
  })

  it("Verifica cuando no hay nombre de equipo 1", () => {
    component.nombresEscuderias = []
    component.validarCamposRequeridos()
    expect(component.faltaNombreE1).toBeTrue();
  })

  it("Verifica cuando no hay nombre de equipo 2", () => {
    component.nombresEscuderias = []
    component.validarCamposRequeridos()
    expect(component.faltaNombreE2).toBeTrue();
  })

  it("Verifica cuando el nombre de la escuderia ya esta tomado", () => {
    component.nombresEscuderias = [{ "nombreEscuderia": "EscuderiaTest" }]
    component.nombreEsc = "EscuderiaTest"
    component.verificarNombresEsc()
    expect(component.nombreEscTomado).toBeTrue();
  })


  it("Verifica que se asigne la escuderia al equipo 1", () => {
    const esc: Escuderia = { "marca": "prueba", "precio": 50, "urlLogo": "prueba" }
    component.selecEsc(esc)
    expect(component.escuderiaE1).toEqual(esc);
  })

  it("Verifica que se asigne la escuderia al equipo 2", () => {
    component.equipo = false;
    const esc: Escuderia = { "marca": "prueba", "precio": 50, "urlLogo": "prueba" }
    component.selecEsc(esc)
    expect(component.escuderiaE2).toEqual(esc);
  })

  it("Verifica que se seleccione un piloto del equipo 1", () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.pilotosE1 = [p1];
    component.selecPilotos(p2)
    expect(component.pilotosE1).toEqual([p1,p2]);
  })

  it("Verifica que se deseleccione un piloto del equipo 1", () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.pilotosE1 = [p1,p2];
    component.selecPilotos(p2)
    expect(component.pilotosE1).toEqual([p1]);
  })

  it("Verifica si se han seleccionado 5 pilotos en el quipo 1" , () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.pilotosE1 = [p1,p1,p1,p1];
    component.selecPilotos(p2)
    expect(component.pilotosE1completos).toBeTrue();
  })

  it("Verifica que se seleccione un piloto del equipo 2", () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.equipo = false;
    component.pilotosE2 = [p1];
    component.selecPilotos(p2)
    expect(component.pilotosE2).toEqual([p1, p2]);
  })

  it("Verifica que se deseleccione un piloto del equipo 2", () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.equipo = false;
    component.pilotosE2 = [p1, p2];
    component.selecPilotos(p2)
    expect(component.pilotosE2).toEqual([p1]);
  })

  it("Verifica si se han seleccionado 5 pilotos en el quipo 2", () => {
    const p1: Piloto = { "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" };
    const p2: Piloto = { "nombre": "prueba1", "pais": "prueba1", "precio": 15, "equipoReal": "prueba1", "urlLogo": "prueba1" }
    component.equipo = false;
    component.pilotosE2 = [p1, p1, p1, p1];
    component.selecPilotos(p2)
    expect(component.pilotosE2completos).toBeTrue();
  })

  it("Verifica que el presupuesto del equipo 1 se calcula correctamente", () => {
    component.presupuesto = 100;
    component.pilotosE1 = [{ "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" },
    { "nombre": "prueba", "pais": "prueba", "precio": 15, "equipoReal": "prueba", "urlLogo": "prueba" }];
    component.escuderiaE1 = { "marca": "prueba", "precio": 50, "urlLogo":"prueba"};
    component.calcPresupuesto();
    expect(component.presupuestoE1).toEqual(25);
  })

  it("Verifica que el presupuesto del equipo 2 se calcula correctamente", () => {
    component.equipo = false;
    component.presupuesto = 100;
    component.pilotosE2 = [{ "nombre": "prueba", "pais": "prueba", "precio": 10, "equipoReal": "prueba", "urlLogo": "prueba" },
    { "nombre": "prueba", "pais": "prueba", "precio": 15, "equipoReal": "prueba", "urlLogo": "prueba" }];
    component.escuderiaE2 = { "marca": "prueba", "precio": 50, "urlLogo": "prueba" };
    component.calcPresupuesto();
    expect(component.presupuestoE2).toEqual(25);
  })

  it("Verifica que se seleccione correctamente el equipo 1", () => {
    component.equipo = false;
    component.selecEquipo1();
    expect(component.equipo).toBeTrue();
  })

  it("Verifica que se seleccione correctamente el equipo 2", () => {
    component.selecEquipo2();
    expect(component.equipo).toBeFalse();
  })

  it("Verifica que se seleccione correctamente la opcion de escoger escuderia", () => {
    component.escOPil = false;
    component.selecEscu()
    expect(component.escOPil).toBeTrue();
  })

  it("Verifica que se seleccione correctamente la opcion de escoger pilotos", () => {
    component.selecPiloto()
    expect(component.escOPil).toBeFalse();
  })

});
