import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RegisterService } from './register.service';


describe('RegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created',inject(
    [HttpClientTestingModule],
    () => {
      const service: RegisterService = TestBed.get(RegisterService);
      expect(service).toBeTruthy();
    })
  );
});
