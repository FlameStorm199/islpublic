import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BancaleComponent } from './bancale.component';

describe('BancaleComponent', () => {
  let component: BancaleComponent;
  let fixture: ComponentFixture<BancaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BancaleComponent]
    });
    fixture = TestBed.createComponent(BancaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
