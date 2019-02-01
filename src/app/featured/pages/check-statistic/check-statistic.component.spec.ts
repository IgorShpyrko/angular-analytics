import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MzToastService } from 'ngx-materialize';
import { MockTokenService } from 'src/app/core/mock/services/token.service';

import { CheckStatisticComponent } from './check-statistic.component';

const _tokenService = new MockTokenService();

describe('AnalizeComponent', () => {
  let component: CheckStatisticComponent;
  let fixture: ComponentFixture<CheckStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CheckStatisticComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MzToastService, useClass: MzToastService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _tokenService.createFakeToken();
    fixture = TestBed.createComponent(CheckStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    _tokenService.removeFakeToken()
  });

  it('should create',
  inject(
    [HttpClientTestingModule],
    () => {
      expect(component).toBeTruthy();
    })
  );
});

