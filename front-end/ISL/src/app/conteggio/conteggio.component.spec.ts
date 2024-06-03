import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteggioComponent } from './conteggio.component';

describe('ConteggioComponent', () => {
  let component: ConteggioComponent;
  let fixture: ComponentFixture<ConteggioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConteggioComponent]
    });
    fixture = TestBed.createComponent(ConteggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
