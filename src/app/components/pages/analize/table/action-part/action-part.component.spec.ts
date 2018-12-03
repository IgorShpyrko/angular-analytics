import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPartComponent } from './action-part.component';

describe('ActionPartComponent', () => {
  let component: ActionPartComponent;
  let fixture: ComponentFixture<ActionPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
