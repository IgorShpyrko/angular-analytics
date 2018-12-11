import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SitesService } from 'src/app/common/services/sites/sites.service';
import { ActionsService } from 'src/app/common/services/actions/actions.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-analize',
  templateUrl: './analize.component.html',
  styleUrls: ['./analize.component.css']
})
export class AnalizeComponent implements OnInit {
  @ViewChild('currentIframe') iframe:ElementRef
  constructor(
    private _sitesService: SitesService,
    private _actionsService: ActionsService,
    private _toastService: MzToastService) {}

  sites: any[];
  selectedSite: string;
  selectedEvent = '';
  selectedSiteUUID = '';
  fetchedEvents: any;
  fetchedUserActions: any;

  ngOnInit() {
    this.getAllSites()
  }

  getAllSites() {
    this._sitesService.getAllSites()
    .then ((sites: {site: []}) => {
      this.sites = sites.site
    });
  };

  getActions() {
    this._actionsService.getSiteActions(this.selectedSiteUUID, this.selectedEvent)
    .then((data: any) => {
      this.fetchedUserActions = data;
    })
  }

  onSelectSite(e) {
    this.selectedSiteUUID = e.target.value;
    this._actionsService.getSubmitedActionsList(this.selectedSiteUUID)
      .then( ( data: { events: string[] } ) => {
        this.fetchedEvents = data.events
      })

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this.getActions();
    }
  }

  onSelectEvent(e) {
    this.selectedEvent = e.target.value;

    if (this.selectedSiteUUID === '') {
      this._toastService.show('must choose site', 4000, 'red')
    }

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this.getActions();
    }
  }

}
