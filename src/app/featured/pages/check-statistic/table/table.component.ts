import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges {
  @Input() siteEvents;
  @Input() min: number;
  @Input() max: number;
  actionList: any[];
  
  constructor() { }

  ngOnChanges(changes: any) {
    console.log('changes')
    console.log(this.siteEvents)
  }
}
