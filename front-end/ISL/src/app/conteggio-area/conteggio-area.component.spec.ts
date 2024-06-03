import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteggioAreaComponent } from './conteggio-area.component';

describe('ConteggioAreaComponent', () => {
  let component: ConteggioAreaComponent;
  let fixture: ComponentFixture<ConteggioAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConteggioAreaComponent]
    });
    fixture = TestBed.createComponent(ConteggioAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
