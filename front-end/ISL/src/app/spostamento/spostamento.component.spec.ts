import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpostamentoComponent } from './spostamento.component';

describe('SpostamentoComponent', () => {
  let component: SpostamentoComponent;
  let fixture: ComponentFixture<SpostamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpostamentoComponent]
    });
    fixture = TestBed.createComponent(SpostamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
