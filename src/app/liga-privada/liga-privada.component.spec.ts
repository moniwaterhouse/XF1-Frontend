import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorService } from '@app/_services/jugador.service';
import { LigasService } from '@app/_services/ligas.service';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LigaPrivadaComponent } from './liga-privada.component';

describe('RankingPrivadoComponent', () => {
  let component: LigaPrivadaComponent;
  let fixture: ComponentFixture<LigaPrivadaComponent>;

  let jugadorService = JugadorService;
  let ligasService = LigasService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [LigaPrivadaComponent],
      providers: [JugadorService, LigasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LigaPrivadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se muestra correctamente el form de crear liga', () => {
    component.mostrarCrearLigaPrivadaForm()
    expect(component.crearLiga).toBeTrue();
    expect(component.ocultarOpciones).toBeTrue();
  });

  it('Se muestra correctamente el form de unirese a una liga', () => {
    component.mostrarUnirseLigaPrivadaForm()
    expect(component.unirseLiga).toBeTrue();
    expect(component.ocultarOpciones).toBeTrue();
  });

  it('Se cancela correctamente el unirse o crear una liga', () => {
    component.cancelar()
    expect(component.crearLiga).toBeFalse();
    expect(component.unirseLiga).toBeFalse();
    expect(component.ocultarOpciones).toBeFalse();
  });

  it('Las llaves se reinician correctamente', () => {
    component.resetLlaves()
    expect(component.missingLlave).toBeFalse();
    expect(component.llaveErronea).toBeFalse();
    expect(component.limiteAlcanzado).toBeFalse();
  });

  it('Se detecta que falta un nombre de liga al crearla', () => {
    component.formarLiga()
    expect(component.missingName).toBeTrue();
  });

  it('Se comprueba que la liga se crea con los valores correctos', () => {
    component.nombreLiga = 'Liga prueba'
    component.correoJugador ='\'prueba@gmail.com\''
    component.formarLiga()
    expect(component.nuevaLigaPrivada).toEqual({ 'nombre': 'Liga prueba', 'correo':'prueba@gmail.com'});
  });

  it('Se detecta que falta una llave al unirse a una liga', () => {
    component.unirseLigaPrivada()
    expect(component.missingLlave).toBeTrue();
  });


  it('Se prueba que se usan los valores correctos al unirse a una liga', () => {
    component.ligasCreadas = [{ 'id': 'ABCD-1236' }, { 'id': 'ABCD-1235' }]
    component.llavePrivada = 'ABCD-1234'
    component.correoJugador = '\'prueba@gmail.com\''
    component.unirseLigaPrivada()
    expect(component.ligaPrivadaId).toEqual({ 'id': 'ABCD-1234', 'correo': 'prueba@gmail.com' });
  });

  it('Se prueba que revise si la liga existe', () => {
    component.ligasCreadas = [{ 'id': 'ABCD-1236' }, { 'id': 'ABCD-1235' }]
    component.llavePrivada = 'ABCD-1234'
    component.correoJugador = 'prueba@gmail.com'
    component.unirseLigaPrivada()
    expect(component.llaveErronea).toBeTrue()
  });


});
