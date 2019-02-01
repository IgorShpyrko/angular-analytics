import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SitesService } from 'src/app/core/services/sites/sites.service';
import { ActionsService } from 'src/app/core/services/actions/actions.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-check-statistic',
  templateUrl: './check-statistic.component.html',
  styleUrls: ['./check-statistic.component.css']
})
export class CheckStatisticComponent implements OnInit {
  @ViewChild('currentIframe') iframe:ElementRef
  constructor(
    private _sitesService: SitesService,
    private _actionsService: ActionsService,
    private _toastService: MzToastService) {}

  sites: any[];
  selectedEvent = '';
  selectedSiteUUID = '';
  fetchedEvents: any;
  fetchedUserActions: any;

  ngOnInit() {
    this.getAllSites()
  }

  getAllSites() {
    this._sitesService.getAll()
    .then ((sites: []) => {
      this.sites = sites
    });
  };

  getActions() {
    this._actionsService.get(this.selectedSiteUUID)
    .then((data: any) => {
      this.fetchedUserActions = data;
    })
  }

  onSelectSite(e: Event) {
    this.selectedSiteUUID = (<HTMLSelectElement>e.target).value;
    this.getActions();
  }

  onSelectEvent(e: Event) {
    this.selectedEvent = (<HTMLSelectElement>e.target).value;

    if (this.selectedSiteUUID === '') {
      const message = 'must choose site';

      this._toastService.show(message, 4000, 'red');
    }

    if ((this.selectedEvent !== '') && (this.selectedSiteUUID !== '')) {
      this.getActions();
    }
  }

}
