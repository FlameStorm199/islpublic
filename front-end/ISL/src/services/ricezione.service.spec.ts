import { TestBed } from '@angular/core/testing';

import { RicezioneService } from './ricezione.service';

describe('RicezioneService', () => {
  let service: RicezioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RicezioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
