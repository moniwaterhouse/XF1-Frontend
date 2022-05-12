import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCarrerasComponent } from './crear-carreras.component';

describe('CrearCarrerasComponent', () => {
  let component: CrearCarrerasComponent;
  let fixture: ComponentFixture<CrearCarrerasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCarrerasComponent ]
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
});
