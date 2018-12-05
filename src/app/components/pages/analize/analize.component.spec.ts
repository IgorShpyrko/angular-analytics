import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MzToastService } from 'ngx-materialize';
import { TokenService } from 'src/app/common/services/token/token.service';

import { AnalizeComponent } from './analize.component';

const _tokenService = new TokenService();

describe('AnalizeComponent', () => {
  let component: AnalizeComponent;
  let fixture: ComponentFixture<AnalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ AnalizeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MzToastService, useClass: MzToastService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _tokenService.createFakeToken();
    fixture = TestBed.createComponent(AnalizeComponent);
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

