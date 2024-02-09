import { TestBed } from '@angular/core/testing';

import { SmartfitGymsService } from './smartfit-gyms.service';

describe('SmartfitGymsService', () => {
  let service: SmartfitGymsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartfitGymsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
