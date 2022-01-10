/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EgresoService } from './egreso.service';

describe('Service: Egreso', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EgresoService]
    });
  });

  it('should ...', inject([EgresoService], (service: EgresoService) => {
    expect(service).toBeTruthy();
  }));
});
