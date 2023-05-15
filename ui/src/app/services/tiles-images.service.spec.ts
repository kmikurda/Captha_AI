import { TestBed } from '@angular/core/testing';

import { TilesImagesService } from './tiles-images.service';

describe('TilesImagesService', () => {
  let service: TilesImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TilesImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
