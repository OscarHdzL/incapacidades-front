import { TestBed } from '@angular/core/testing';

import { ApopService } from './apop.service';

describe('ApopService', () => {
  let service: ApopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
