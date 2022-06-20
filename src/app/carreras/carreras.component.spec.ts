import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarrerasComponent } from './carreras.component';
import { CarrerasService } from '@app/_services/carreras.service';

describe('CarrerasComponent', () => {
  let component: CarrerasComponent;
  let fixture: ComponentFixture<CarrerasComponent>;
  let carreraService = CarrerasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarrerasComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])],
      providers: [CarrerasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrerasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se selecciona el campeonato correctamente', () => {
    const carreras = [{ "nombre": "prueba", "nombrePais": "prueba", "idCampeonato": "1", "nombrePista": "prueba", "fechaInicio": "10-12-12", "horaInicio": "12:12", "fechaFin": "11-12-12", "horaFin": "12:20" },
      { "nombre": "prueba2", "nombrePais": "prueba", "idCampeonato": "1", "nombrePista": "prueba", "fechaInicio": "10-12-12", "horaInicio": "12:12", "fechaFin": "11-12-12", "horaFin": "12:20" }]
    component.carreras = carreras
    const campeonato = { "id": "1", "nombre": "prueba", "presupuesto": 0, "fechaInicio": "10-12-12", "horaInicio": "12:12", "fechaFin": "11-12-12", "horaFin": "12:20", "reglasPuntuacion": "reglas" }
    component.selecCampeonato(campeonato)
    expect(component.campeonatoNombre).toEqual("prueba");
  });


  it('Se detecta si hay resultados pendientes', () => {
    const carreras = [{ "nombre": "prueba", "nombrePais": "prueba", "idCampeonato": "1", "nombrePista": "prueba", "fechaInicio": "10-12-12", "horaInicio": "12:12", "fechaFin": "11-12-12", "horaFin": "12:20","estado":"Calificacion Completada","nombreCampeonato":"CampeonatoPrueba" },
      { "nombre": "prueba2", "nombrePais": "prueba", "idCampeonato": "1", "nombrePista": "prueba", "fechaInicio": "10-12-12", "horaInicio": "12:12", "fechaFin": "11-12-12", "horaFin": "12:20", "estado": "Pendiente", "nombreCampeonato": "CampeonatoPrueba" }]
    component.carreras = carreras
    component.campeonatoNombre = "CampeonatoPrueba"
    component.resPendientes()
    expect(component.resultadosPendientes).toBeTrue();
  });

  it('Las banderas se restauran correctamente', () => {
    component.archivoIncorrecto = true
    component.formatoIncorrecto = true
    component.archivoSubido = true
    component.reiniciarBanderas()
    expect(component.archivoIncorrecto).toBeFalse();
    expect(component.formatoIncorrecto).toBeFalse();
    expect(component.archivoSubido).toBeFalse();
  });
});
