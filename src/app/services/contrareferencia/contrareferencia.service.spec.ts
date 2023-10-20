import { TestBed } from '@angular/core/testing';

import { ContrareferenciaService } from './contrareferencia.service';

describe('ContrareferenciaService', () => {
  let service: ContrareferenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContrareferenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
