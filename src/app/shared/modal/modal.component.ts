import { Component, EventEmitter, OnInit, Input, Output, ElementRef, ViewChild } from '@angular/core';
import API from 'src/app/core/constants/';
import { FormBuilder, Validators } from '@angular/forms';

interface Changes {
  name: string;
  uuid: string;
  newActionsList: any[];
  deletedActions: any[];
};

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('modalWrapper') taskNoteRef:ElementRef;
  @Input() site: any;
  @Input() allActions: any[];
  @Input() siteActions: any[];
  newActionsList: any[] = [];
  deletedActions: any[] = [];

  constructor( private fb: FormBuilder ) { }

  profileForm = this.fb.group({
    name: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(API.regExps.pathRegexp)
      ])
    ]
  })

  ngOnInit() {
    this.newActionsList = this.siteActions;
    this.profileForm.setValue({
      name: this.site.name
    });
  }

  addNewEvent(e) {
    const newValue = e.target.value;

    if (!this.newActionsList.includes(newValue)) {
      this.newActionsList.push(newValue)
    }
  }

  @Output() onApplyChanges = new EventEmitter<Changes>()
  applyChanges() {
    const changes: Changes = {
      name: this.profileForm.controls.name.value,
      uuid: this.site.uuid,
      newActionsList: this.newActionsList || [],
      deletedActions: this.deletedActions || []
    };
    this.onApplyChanges.emit(changes);
  }

  @Output() onClose = new EventEmitter<boolean>();
  close() {
    this.onClose.emit(true)
  }

  clickOnWrapper(e) {
    if (e.target.className === 'modal-wrapper') {
      this.onClose.emit(true)
    }
  }

  deleteEvent(e) {
    this.newActionsList = this.newActionsList.filter(event => event !== e.target.previousSibling.innerText);
    this.deletedActions.push(e.target.previousSibling.innerText);
  }

  get f() {
    return this.profileForm.controls;
  };
}
