import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { pathRegexp } from '../../constants/regExps';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionsService } from '../../services/actions/actions.service';
import { SitesService } from 'src/app/services/sites/sites.service';

interface Changes {
  address: string;
  uuid: string;
  actionsList: string[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() Data: any;
  constructor(
    private fb: FormBuilder,
    private _actionsService: ActionsService,
    private _sitesService: SitesService) { }

  address: string;
  uuid: string;
  actionsList: string[];
  submittedEventList: string[];

  profileForm = this.fb.group({
    address:[
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(pathRegexp)
      ])
    ]
  })
  
  ngOnInit() {
    this.address = this.Data.address;
    this.uuid = this.Data.uuid;
    this._actionsService.getActionsList()
      .subscribe((data: string[]) => {
        console.log(data)
        this.actionsList = data
      },
      error => {
        console.log(error)
      })

    this._actionsService.getSubmitedActionsList(this.uuid)
      .subscribe((data: {events: string[]}) => {
        console.log(data)
        this.submittedEventList = data.events
      },
      error => {
        console.log(error)
      });
  }

  selectNewEvent(e) {
    
    console.log(e.target.value)

    let newValue = e.target.value;

    if (!newValue) return;

    if (!this.submittedEventList.includes(newValue)) {
      this.submittedEventList.push(newValue)
    }

  }

  // @Output() onApplyChanges = new EventEmitter<Changes>();
  applyChanges() {

    // let changes = {
    //   address: this.address,
    //   uuid: this.uuid,
    //   actionsList: this.submittedEventList
    // };

    if (this.submittedEventList.length !== 0) {
      this._sitesService.attachEvents(this.uuid, this.actionsList)
      .subscribe(data => {
        console.log(data)
        this.onClose.emit(true)
      },
      error => {
        console.log(error)
      })
    }

    // this.onApplyChanges.emit(changes);
  }
  
  @Output() onClose = new EventEmitter<boolean>();
  close(e) {
    if (e.target.className === 'modal-wrapper') {
      this.onClose.emit(true)
    }
  }

  change(value) {
    console.log(value)
  };

  deleteAction(e) {
    console.log(e.target.previousSibling.innerText)
    let eventToDelete = e.target.previousSibling.innerText;
    let newActions = this.actionsList.filter(action => action !== eventToDelete)
    this._sitesService.attachEvents(this.uuid, newActions)
      .subscribe(data => {
        console.log(data)
      })

  }

  get f() {
    return this.profileForm.controls;
  };

}
