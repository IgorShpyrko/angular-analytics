import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { API } from 'src/app/common/constants/';
import { FormBuilder, Validators } from '@angular/forms';

interface Changes {
  address: string;
  uuid: string;
  changedEventsList: string[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() site: any;
  @Input() changedEventsList: any;
  @Input() actionsList: any;
  constructor(private fb: FormBuilder) { }

  profileForm = this.fb.group({
    address: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(API.regExps.pathRegexp)
      ])
    ]
  })

  ngOnInit() {
    this.profileForm.setValue({
      address: this.site.address
    });
  }

  addNewEvent(e) {
    const newValue = e.target.value;

    if (!this.changedEventsList.includes(newValue)) {
      this.changedEventsList.push(newValue)
    }
  }

  @Output() onApplyChanges = new EventEmitter<Changes>()
  applyChanges() {

    const changes: Changes = {
      address: this.profileForm.controls.address.value,
      uuid: this.site.uuid,
      changedEventsList: this.changedEventsList || []
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
    this.changedEventsList = this.changedEventsList.filter(event => event !== e.target.previousSibling.innerText)
  }

  get f() {
    return this.profileForm.controls;
  };

}
