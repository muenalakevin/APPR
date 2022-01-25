/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CalificacionService } from './calificacion.service';

describe('Service: Calificacion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalificacionService]
    });
  });

  it('should ...', inject([CalificacionService], (service: CalificacionService) => {
    expect(service).toBeTruthy();
  }));
});
