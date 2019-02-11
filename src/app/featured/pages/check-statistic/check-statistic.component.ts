import { Component, OnInit } from '@angular/core';
import { SitesService } from 'src/app/core/services/sites/sites.service';
import { ActionsService } from 'src/app/core/services/actions/actions.service';
import { EventsService } from 'src/app/core/services/events/events.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-check-statistic',
  templateUrl: './check-statistic.component.html',
  styleUrls: ['./check-statistic.component.css']
})
export class CheckStatisticComponent implements OnInit {
  constructor(
    private _sitesService: SitesService,
    private _actionsService: ActionsService,
    private _eventsService: EventsService,
    private _toastService: MzToastService) {}

    private sites: any[];
    private selectedSiteUUID:string = '';
    private siteActions: string = '';
    private selectedAction: string | [] = '';
    public siteEvents: any;
    private elementsCount: number = 0;
    private elementsPerPage: number = 20;
    public min: number = 0;
    public max: number = this.elementsPerPage;
    private pagesCount: number = 1;
    private Arr = Array;

  ngOnInit() {
    this._sitesService.getAll()
      .then ((data: any) => {
        this.sites = data.sites
      });
  };

  onSelectSite(e: Event) {
    this.selectedSiteUUID = (<HTMLSelectElement>e.target).value;

    this._actionsService.get(this.selectedSiteUUID)
      .then((data: any) => {
        this.siteActions = data.actions;
      })
  };

  onSelectAction(e: Event) {
    this.selectedAction = (<HTMLSelectElement>e.target).value;

    if (this.selectedSiteUUID === '') {
      const message = 'must choose site';
      this._toastService.show(message, 4000, 'red');
    }

    if (this.selectedSiteUUID && this.selectedAction) {
      this._eventsService.get(this.selectedAction, this.selectedSiteUUID)
      .then((data: { success: string, events: { any } }) => {
        this.siteEvents = data.events;

        this.elementsCount = 0;
        for (let _events in data.events) {
          this.elementsCount += data.events[_events].length;
        };
        this.pagesCount = Math.ceil(this.elementsCount / this.elementsPerPage)
      })
      .catch(err => {
        this._toastService.show(err.message, 4000, 'red')
        this.siteEvents = '';
      })
    }
  };

  selectPage(e: Event) {
    let page: number = +(<HTMLSpanElement>e.target).innerText

    this.min = (page - 1) * this.elementsPerPage;
    this.max = page * this.elementsPerPage;
  }
}
