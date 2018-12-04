import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ActionsService } from './actions.service';

describe('ActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', inject ([HttpClientTestingModule], () => {
    const service: ActionsService = TestBed.get(ActionsService);
    expect(service).toBeTruthy();
  }));
});
