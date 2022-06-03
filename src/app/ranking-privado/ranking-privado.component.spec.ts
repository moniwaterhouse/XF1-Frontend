import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPrivadoComponent } from './ranking-privado.component';

describe('RankingPrivadoComponent', () => {
  let component: RankingPrivadoComponent;
  let fixture: ComponentFixture<RankingPrivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingPrivadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingPrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
