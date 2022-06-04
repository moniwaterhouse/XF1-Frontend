import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaPrivadaComponent } from './liga-privada.component';

describe('RankingPrivadoComponent', () => {
  let component: LigaPrivadaComponent;
  let fixture: ComponentFixture<LigaPrivadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LigaPrivadaComponent ]
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
});
