import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugadorService } from '@app/_services/jugador.service';
import { LigasService } from '@app/_services/ligas.service';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfilJugadorComponent } from './perfil-jugador.component';
import { Equipo } from '@app/_interfaces/equipo';

describe('PerfilJugadorComponent', () => {
  let component: PerfilJugadorComponent;
  let fixture: ComponentFixture<PerfilJugadorComponent>;

  let jugadorService = JugadorService;
  let ligasService = LigasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [PerfilJugadorComponent],
      providers: [JugadorService, LigasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
