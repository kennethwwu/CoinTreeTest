import { TestBed, inject } from '@angular/core/testing';

import { CrytoPriceSeriveService } from './cryto-price-serive.service';

describe('CrytoPriceSeriveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrytoPriceSeriveService]
    });
  });

  it('should be created', inject([CrytoPriceSeriveService], (service: CrytoPriceSeriveService) => {
    expect(service).toBeTruthy();
  }));
});
