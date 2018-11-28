import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { pathRegexp } from '../../constants/regExps';
import { FormBuilder, Validators } from '@angular/forms';
import { ActionsService } from '../../services/actions/actions.service';
import { SitesService } from 'src/app/services/sites/sites.service';

interface Changes {
  address: string;
  eventList: string[];
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
    private _siteService: SitesService) { }

  address: string;
  uuid: string;
  eventList: string[];
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
    this.eventList = this._actionsService.getActionsList();

    this._actionsService.getSubmitedActionsList(this.uuid)
      .subscribe(data => {
        console.log(data)
      },
      error => {
        console.log(error)
      });
  }

  // @Output() onApplyChanges = new EventEmitter<Changes>();
  applyChanges() {
    console.log('applying')

    // let changes = {
    //   address: '',
    //   eventList: []
    // }
    // this.onApplyChanges.emit(changes)
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

  deleteEvent(e) {
    console.log(e.target.previousSibling.innerText)
    let eventToDelete = e.target.previousSibling.innerText;
    let newEvents = this.eventList.filter(event => event !== eventToDelete)
    this._siteService.attachEvents(this.uuid, newEvents)
      .subscribe(data => {
        console.log(data)
      })

  }

  get f() {
    return this.profileForm.controls;
  };

}
