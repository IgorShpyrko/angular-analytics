import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalizeComponent } from './analize.component';

describe('AnalizeComponent', () => {
  let component: AnalizeComponent;
  let fixture: ComponentFixture<AnalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
