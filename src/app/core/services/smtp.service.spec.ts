/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SmtpService } from './smtp.service';

describe('Service: Smtp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SmtpService]
    });
  });

  it('should ...', inject([SmtpService], (service: SmtpService) => {
    expect(service).toBeTruthy();
  }));
});
