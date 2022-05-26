import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CampeonatosComponent } from './campeonatos.component';
import { CampeonatosService } from '../_services/campeonatos.service';

describe('CampeonatosComponent', () => {
  let component: CampeonatosComponent;
  let fixture: ComponentFixture<CampeonatosComponent>;

  let campeonatosService: CampeonatosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CampeonatosComponent],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([])],
      providers: [CampeonatosService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampeonatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
