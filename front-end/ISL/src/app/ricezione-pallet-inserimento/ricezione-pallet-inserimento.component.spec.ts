import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RicezionePalletInserimentoComponent } from './ricezione-pallet-inserimento.component';

describe('RicezionePalletInserimentoComponent', () => {
  let component: RicezionePalletInserimentoComponent;
  let fixture: ComponentFixture<RicezionePalletInserimentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RicezionePalletInserimentoComponent]
    });
    fixture = TestBed.createComponent(RicezionePalletInserimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
