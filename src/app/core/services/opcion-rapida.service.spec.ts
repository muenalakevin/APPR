import { TestBed } from '@angular/core/testing';

import { OpcionRapidaService } from './opcion-rapida.service';

describe('OpcionRapidaService', () => {
  let service: OpcionRapidaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcionRapidaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
