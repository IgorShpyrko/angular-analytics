import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SitesService } from './sites.service';

describe('SitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', inject(
    [HttpClientTestingModule],
    () => {
      const service: SitesService = TestBed.get(SitesService);
      expect(service).toBeTruthy();
    })
  );
});
