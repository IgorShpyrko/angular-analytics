import { Component, OnInit } from '@angular/core';
import { SitesService } from '../../../services/sites/sites.service';

@Component({
  selector: 'app-analize',
  templateUrl: './analize.component.html',
  styleUrls: ['./analize.component.css']
})
export class AnalizeComponent implements OnInit {
  constructor(private _siteService: SitesService) { }

  siteList: []

  ngOnInit() {
    this._siteService.getAll()
      .subscribe((sites: {site: []}) => {
        console.log(sites)
        this.siteList = sites.site
      })
  }

}
