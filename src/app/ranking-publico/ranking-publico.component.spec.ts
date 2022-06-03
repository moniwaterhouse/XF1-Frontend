import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingPublicoComponent } from './ranking-publico.component';

describe('RankingPublicoComponent', () => {
  let component: RankingPublicoComponent;
  let fixture: ComponentFixture<RankingPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingPublicoComponent ]
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
