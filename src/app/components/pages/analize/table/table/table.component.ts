import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommonService } from '../../../../../services/common/common.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() actions;

  preparedActionTypes: string[];
  preparedActions: any[];

  constructor(private _commonService: CommonService) { }

  ngOnChanges(changes) {
    console.log(changes)

    if(!this._commonService.deepEquals(
      changes.actions.currentValue,
      changes.actions.previousValue
    )) {

      this.preparedActionTypes = [];
      this.preparedActions = [];
      
      for (let key of Object.keys(changes.actions.currentValue)) {
        console.log(key)
        this.preparedActionTypes.push(key);
        this.preparedActions.push(changes.actions.currentValue[key])
        console.log(changes.actions.currentValue[key])
      }
    }
  }

}