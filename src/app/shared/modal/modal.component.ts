import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ActionsService } from '../../services/actions/actions.service';

interface changes {
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
  constructor(private _actionsService: ActionsService) { }

  address: string;
  uuid: string;
  eventList: string[];
  submittedEventList: string[];
  
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
      })
    console.log('init', this.Data)
  }

  @Output() onApplyChanges = new EventEmitter<changes>();
  applyChanges() {
    console.log('applying')
  }
  
  @Output() onClose = new EventEmitter<boolean>();
  close(e) {
    if (e.target.className === 'modal-wrapper') {
      this.onClose.emit(true)
    }
  }

  @Output() onChange = new EventEmitter<string>();
  change(value) {
    this.onChange.emit(value)
  }

}
