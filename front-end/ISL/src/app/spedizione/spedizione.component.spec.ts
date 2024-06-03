import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpedizioneComponent } from './spedizione.component';

describe('SpedizioneComponent', () => {
  let component: SpedizioneComponent;
  let fixture: ComponentFixture<SpedizioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpedizioneComponent]
    });
    fixture = TestBed.createComponent(SpedizioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
