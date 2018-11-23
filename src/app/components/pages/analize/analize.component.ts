import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../../services/sites/sites.service';

@Component({
  selector: 'app-analize',
  templateUrl: './analize.component.html',
  styleUrls: ['./analize.component.css']
})
export class AnalizeComponent implements OnInit {
  constructor(private _siteService: SitesService) { }

  siteList: [];
  mockEventList:Array<string> = [
    'click',
    'keypress',
    'input',
    'change'
  ]

  ngOnInit() {
    this._siteService.getAll()
      .subscribe((sites: {site: []}) => {
        this.siteList = sites.site
      })
  }

}
