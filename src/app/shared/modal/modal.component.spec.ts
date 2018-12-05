import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [ ModalComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.taskNoteRef.nativeElement.className = 'testing-modal-wrapper';
    component.site = {
      address: "http://localhost:4200",
      createdAt: "2018-11-30T12:19:20.528Z",
      customerUuid: "2d48ca70-f3b7-11e8-b532-2d888fa2e51b",
      updatedAt: "2018-11-30T12:19:20.528Z",
      uuid: "2a383df0-f49a-11e8-ac88-6567d4c5a850"
    }
    fixture.detectChanges();
  });

  afterEach(() => {
    component.onClose.emit(true)
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
