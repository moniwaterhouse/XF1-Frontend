import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarEscuderiaComponent } from './configurar-escuderia.component';

describe('ConfigurarEscuderiaComponent', () => {
  let component: ConfigurarEscuderiaComponent;
  let fixture: ComponentFixture<ConfigurarEscuderiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarEscuderiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurarEscuderiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
