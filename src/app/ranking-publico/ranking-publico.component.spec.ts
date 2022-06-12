import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LigasService } from '@app/_services/ligas.service';
import { JugadorService } from '@app/_services/jugador.service';
import { RankingPublicoComponent } from './ranking-publico.component';

describe('RankingPublicoComponent', () => {
  let component: RankingPublicoComponent;
  let fixture: ComponentFixture<RankingPublicoComponent>;


  let jugadorService = JugadorService;
  let ligasService = LigasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [RankingPublicoComponent],
      providers: [JugadorService, LigasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
