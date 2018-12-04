import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService } from './auth.service';

describe('AuthServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', inject(
    [HttpClientTestingModule, RouterTestingModule],
    () => {
      const service: AuthService = TestBed.get(AuthService);
      expect(service).toBeTruthy();
    })
  );
});
