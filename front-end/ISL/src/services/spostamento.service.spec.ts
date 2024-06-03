import { TestBed } from '@angular/core/testing';

import { SpostamentoService } from './spostamento.service';

describe('SpostamentoService', () => {
  let service: SpostamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpostamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
