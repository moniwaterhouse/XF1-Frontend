import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearCarrerasComponent } from './crear-carreras.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarrerasService } from '@app/_services/carreras.service';
import { CampeonatosService } from '@app/_services/campeonatos.service';
import { Campeonato } from '@app/_interfaces/campeonatos';
import { CarrerasComponent } from '@app/carreras/carreras.component';

describe('CrearCarrerasComponent', () => {
  let component: CrearCarrerasComponent;
  let fixture: ComponentFixture<CrearCarrerasComponent>;

  let carrerasService: CarrerasService;
  let campeonatosService: CampeonatosService;

  beforeEach(async () => {
    window.onbeforeunload = () => 'Oh no!';
    await TestBed.configureTestingModule({
      declarations: [CrearCarrerasComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([{ path: 'carreras', component: CarrerasComponent }]),],
      providers: [CampeonatosService, CarrerasService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCarrerasComponent);
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

  it('Verifica cuando no se ha asignado el Pais', () => {
    component.validarCamposRequeridos()
    expect(component.missingPais).toBeTrue();
  });

  it('Verifica cuando no se ha asignado la Pista', () => {
    component.validarCamposRequeridos()
    expect(component.missingPista).toBeTrue();
  });

  it('Verifica cuando no se ha asignado el Campeonato', () => {
    component.validarCamposRequeridos()
    expect(component.missingCampeonato).toBeTrue();
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
    expect(component.missingPais).toBeFalse();
    expect(component.missingPista).toBeFalse();
    expect(component.missingCampeonato).toBeFalse();
    expect(component.missingFechaInicio).toBeFalse();
    expect(component.missingHoraInicio).toBeFalse();
    expect(component.missingMinInicio).toBeFalse();
    expect(component.missingFechaFin).toBeFalse();
    expect(component.missingHoraFin).toBeFalse();
    expect(component.missingMinFin).toBeFalse();
  });


  it('Verifica que se cree la carrera con los datos correctos', () => {
    component.nombre = "Prueba";
    const campeonato: Campeonato = { "id": "1", "nombre": "prueba", "presupuesto": 100, "fechaInicio": "2000-01-01", "horaInicio": "10:20", "fechaFin": "2000-02-02", "horaFin": "11:20", "reglasPuntuacion": "prueba" }
    component.campeonato = campeonato;
    component.pais = "Prueba";
    component.pista = "Prueba";
    component.fechaInicio = new Date("2000-02-02");
    component.horaInicio = 10;
    component.minInicio = 15;
    component.horaFin = 11;
    component.minFin = 15;
    component.fechaFin = new Date("2000-02-03");
    component.validarCamposRequeridos()
    expect(component.carrera).toEqual({ "nombre": "Prueba", "idCampeonato": "1", "nombrePais": "Prueba", "nombrePista": "Prueba", "fechaInicio": '2000-02-01', "horaInicio": "10:15", "fechaFin": '2000-02-02', "horaFin":"11:15"})
  });

  it('Verifica que se obtengan las fechas del campeonato correctamente y se avise que un campeonato fue seleccionado', () => {
    const campeonato: Campeonato = { "id": "1", "nombre": "prueba", "presupuesto": 100, "fechaInicio": "2000-01-01", "horaInicio": "10:20", "fechaFin": "2000-02-02", "horaFin": "11:20", "reglasPuntuacion": "prueba" }
    component.campeonato = campeonato;
    component.onCampeonatoSeleccionado();
    expect(component.campeonato).toBeTrue;
    expect(component.fechaMin.toString()).toEqual("2000-01-01")
    expect(component.fechaMax.toString()).toEqual("2000-02-02")
  });

});
