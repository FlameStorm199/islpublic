import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScaffaleComponent } from './scaffale.component';

describe('ScaffaleComponent', () => {
  let component: ScaffaleComponent;
  let fixture: ComponentFixture<ScaffaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScaffaleComponent]
    });
    fixture = TestBed.createComponent(ScaffaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
