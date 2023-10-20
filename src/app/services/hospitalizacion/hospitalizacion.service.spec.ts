/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HospitalizacionService } from './hospitalizacion.service';

describe('Service: Hospitalizacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HospitalizacionService]
    });
  });

  it('should ...', inject([HospitalizacionService], (service: HospitalizacionService) => {
    expect(service).toBeTruthy();
  }));
});
