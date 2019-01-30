import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AddSiteForAnalizeComponent } from './add-site-for-analize.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MzToastService } from 'ngx-materialize';
import { MockTokenService } from 'src/app/core/mock/services/token.service';

const _tokenService = new MockTokenService();

describe('AddSiteForAnalizeComponent', () => {
  let component: AddSiteForAnalizeComponent;
  let fixture: ComponentFixture<AddSiteForAnalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule, HttpClientTestingModule ],
      declarations: [ AddSiteForAnalizeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MzToastService, useClass: MzToastService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    _tokenService.createFakeToken();
    fixture = TestBed.createComponent(AddSiteForAnalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    _tokenService.removeFakeToken()
  });

  it('should create',
  inject(
    [ HttpClientTestingModule ],
    () => {
      expect(component).toBeTruthy();
    })
  )
});
