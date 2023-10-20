import { TestBed } from '@angular/core/testing';

import { FujiService } from './fuji.service';

describe('FujiService', () => {
  let service: FujiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FujiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
