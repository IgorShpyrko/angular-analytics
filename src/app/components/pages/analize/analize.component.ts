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
    private _sitesService: SitesService,
    private _actionsService: ActionsService) { }

  sites: [];
  selectedEvent:string = '';
  selectedSiteUUID: string = '';
  fetchedEvents: any[] = [];

  ngOnInit() {
    this.getAllSites()
  }

  getAllSites() {
    this._sitesService.getAllSites()
    .then ((sites: {site: []}) => {
      this.sites = sites.site
    });
  };

  getEvents() {
    this._actionsService.getSiteActions(this.selectedSiteUUID, this.selectedEvent)
    .then(data => {
      this.fetchedEvents = data[0]
      console.log(this.fetchedEvents)
    })
  }

  onSelectSite(e) {
    this.selectedSiteUUID = e.target.value;

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this.getEvents();
    }
  }

  onSelectEvent(e) {
    this.selectedEvent = e.target.value;

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this.getEvents();
    }
  }

}
