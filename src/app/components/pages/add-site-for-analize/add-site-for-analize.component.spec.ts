import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteForAnalizeComponent } from './add-site-for-analize.component';

describe('AddSiteForAnalizeComponent', () => {
  let component: AddSiteForAnalizeComponent;
  let fixture: ComponentFixture<AddSiteForAnalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSiteForAnalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteForAnalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
