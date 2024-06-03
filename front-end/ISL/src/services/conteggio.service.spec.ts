import { TestBed } from '@angular/core/testing';

import { ConteggioService } from './conteggio.service';

describe('ConteggioService', () => {
  let service: ConteggioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteggioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
