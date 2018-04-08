import { TestBed, inject } from '@angular/core/testing';

import { GiftDataService } from './gift-data.service';

describe('GiftDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GiftDataService]
    });
  });

  it('should be created', inject([GiftDataService], (service: GiftDataService) => {
    expect(service).toBeTruthy();
  }));
});
