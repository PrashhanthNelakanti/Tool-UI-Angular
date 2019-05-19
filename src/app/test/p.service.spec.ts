import { TestBed, inject } from '@angular/core/testing';

import { PService } from './p.service';

describe('PService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PService]
    });
  });

  it('should be created', inject([PService], (service: PService) => {
    expect(service).toBeTruthy();
  }));
});
