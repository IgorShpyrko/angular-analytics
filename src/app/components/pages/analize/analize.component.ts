import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/services/sites/sites.service';
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
  selector: 'app-analize',
  templateUrl: './analize.component.html',
  styleUrls: ['./analize.component.css']
})
export class AnalizeComponent implements OnInit {
  constructor(
    private _siteService: SitesService,
    private _actionsService: ActionsService) { }

  siteList: [];
  selectedEvent:string = '';
  selectedSiteUUID: string = '';

  mockEventList = [
    'click',
    'input',
    'hover'
  ]

  ngOnInit() {
    this._siteService.getAllSites()
      .subscribe((sites: {site: []}) => {
        this.siteList = sites.site
      })
  }

  onSelectSite(e) {
    this.selectedSiteUUID = e.target.value;

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this._actionsService.getActions(this.selectedSiteUUID, this.selectedEvent)
       .subscribe(data => {
         console.log(data)
       })
    }
  }

  onSelectEvent(e) {
    this.selectedEvent = e.target.value;

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this._actionsService.getActions(this.selectedSiteUUID, this.selectedEvent)
       .subscribe(data => {
         console.log(data)
       })
    }
  }

}
