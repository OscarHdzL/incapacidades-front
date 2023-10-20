import { TestBed } from '@angular/core/testing';

import { BusquedaAvanzadaService } from './busqueda-avanzada.service';

describe('BusquedaAvanzadaService', () => {
  let service: BusquedaAvanzadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedaAvanzadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
