import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CrearCampeonatoComponent } from './crear-campeonato.component';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { CampeonatosComponent } from '@app/campeonatos/campeonatos.component';
import { Campeonato } from '@app/_interfaces/campeonatos';

describe('CrearCampeonatoComponent', () => {
  let component: CrearCampeonatoComponent;
  let fixture: ComponentFixture<CrearCampeonatoComponent>;

  let campeonatoService: CampeonatosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearCampeonatoComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([{ path: 'campeonatos', component: CampeonatosComponent }])],
      providers: [CampeonatosService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCampeonatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Verifica cuando no se ha asignado el nombre', () => {
    component.validarCamposRequeridos()
    expect(component.missingName).toBeTrue();
  });

  it('Verifica cuando no se ha asignado el Presupuesto', () => {
    component.validarCamposRequeridos()
    expect(component.missingPresupuesto).toBeTrue();
  });


  it('Verifica cuando no se ha asignado la Fecha de Inicio', () => {
    component.validarCamposRequeridos()
    expect(component.missingFechaInicio).toBeTrue();
  });

  it('Verifica cuando no se ha asignado la hora de Inicio', () => {
    component.validarCamposRequeridos()
    expect(component.missingHoraInicio).toBeTrue();
  });

  it('Verifica cuando no se ha asignado los minutos de Inicio', () => {
    component.validarCamposRequeridos()
    expect(component.missingMinInicio).toBeTrue();
  });

  it('Verifica cuando no se ha asignado la Fecha de Fin', () => {
    component.validarCamposRequeridos()
    expect(component.missingFechaFin).toBeTrue();
  });

  it('Verifica cuando no se ha asignado la hora de Fin', () => {
    component.validarCamposRequeridos()
    expect(component.missingHoraFin).toBeTrue();
  });

  it('Verifica cuando no se ha asignado los minutos de Fin', () => {
    component.validarCamposRequeridos()
    expect(component.missingMinFin).toBeTrue();
  });

  it('Verifica que se asigne el valor correcto a missinMessage', () => {
    component.validarCamposRequeridos()
    expect(component.missingMessage).toBeTrue();
  });

  it('Verifica que las banderas se restauren correctamente', () => {
    component.validarCamposRequeridos()
    component.restaurarBanderas()
    expect(component.missingName).toBeFalse();
    expect(component.missingPresupuesto).toBeFalse();
    expect(component.missingFechaInicio).toBeFalse();
    expect(component.missingHoraInicio).toBeFalse();
    expect(component.missingMinInicio).toBeFalse();
    expect(component.missingFechaFin).toBeFalse();
    expect(component.missingHoraFin).toBeFalse();
    expect(component.missingMinFin).toBeFalse();
  });

  it('Verifica que se cree la carrera con los datos correctos', () => {
    component.nombre = "Prueba";
    component.presupuesto = 100;
    component.fechaInicio = new Date("2000-02-02");
    component.horaInicio = 10;
    component.minInicio = 15;
    component.horaFin = 11;
    component.minFin = 15;
    component.reglasPuntuacion = "prueba"
    component.fechaFin = new Date("2000-02-03");
    component.validarCamposRequeridos()
    expect(component.campeonato).toEqual({ "id": "", "nombre": "Prueba", "presupuesto": 100, "fechaInicio": '2000-02-01', "horaInicio": "10:15", "fechaFin": '2000-02-02', "horaFin": "11:15", "reglasPuntuacion":"prueba" })
  });
});
