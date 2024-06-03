import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpostamentoAreaComponent } from './spostamento-area.component';

describe('SpostamentoAreaComponent', () => {
  let component: SpostamentoAreaComponent;
  let fixture: ComponentFixture<SpostamentoAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpostamentoAreaComponent]
    });
    fixture = TestBed.createComponent(SpostamentoAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
