import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicezioneComponent } from './ricezione.component';

describe('RicezioneComponent', () => {
  let component: RicezioneComponent;
  let fixture: ComponentFixture<RicezioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicezioneComponent]
    });
    fixture = TestBed.createComponent(RicezioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
