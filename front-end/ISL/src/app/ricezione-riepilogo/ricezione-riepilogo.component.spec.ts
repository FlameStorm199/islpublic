import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicezioneRiepilogoComponent } from './ricezione-riepilogo.component';

describe('RicezioneRiepilogoComponent', () => {
  let component: RicezioneRiepilogoComponent;
  let fixture: ComponentFixture<RicezioneRiepilogoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicezioneRiepilogoComponent]
    });
    fixture = TestBed.createComponent(RicezioneRiepilogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
