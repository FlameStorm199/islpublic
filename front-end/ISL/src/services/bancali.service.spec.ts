import { TestBed } from '@angular/core/testing';

import { BancaliService } from './bancali.service';

describe('BancaliService', () => {
  let service: BancaliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancaliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
