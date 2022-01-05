/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfiguracionService } from './configuracion.service';

describe('Service: Configuracion', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguracionService]
    });
  });

  it('should ...', inject([ConfiguracionService], (service: ConfiguracionService) => {
    expect(service).toBeTruthy();
  }));
});
