import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpedizionePalletComponent } from './spedizione-pallet.component';

describe('SpedizionePalletComponent', () => {
  let component: SpedizionePalletComponent;
  let fixture: ComponentFixture<SpedizionePalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpedizionePalletComponent]
    });
    fixture = TestBed.createComponent(SpedizionePalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
