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
});
