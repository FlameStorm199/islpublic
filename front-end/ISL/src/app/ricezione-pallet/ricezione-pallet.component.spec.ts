import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicezionePalletComponent } from './ricezione-pallet.component';

describe('RicezionePalletComponent', () => {
  let component: RicezionePalletComponent;
  let fixture: ComponentFixture<RicezionePalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicezionePalletComponent]
    });
    fixture = TestBed.createComponent(RicezionePalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
