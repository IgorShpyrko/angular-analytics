import { TestBed } from '@angular/core/testing';

import { GetAllSitesService } from './get-all-sites.service';

describe('GetAllSitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetAllSitesService = TestBed.get(GetAllSitesService);
    expect(service).toBeTruthy();
  });
});
