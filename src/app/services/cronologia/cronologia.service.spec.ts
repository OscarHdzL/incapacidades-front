import { TestBed } from '@angular/core/testing';

import { CronologiaService } from './cronologia.service';

describe('CronologiaService', () => {
  let service: CronologiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CronologiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
