import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pathRegexp } from '../../../constants/regExps';
import { SitesService } from '../../../services/sites/sites.service'

@Component({
  selector: 'app-add-site-for-analize',
  templateUrl: './add-site-for-analize.component.html',
  styleUrls: ['./add-site-for-analize.component.css']
})
export class AddSiteForAnalizeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _sitesService: SitesService
  ) { }

  sites;

  profileForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(pathRegexp)
    ])]
  });

  ngOnInit() {
    this._sitesService.getAll()
      .subscribe(
        (sites: {site: []}) => {
          console.log('initSites: ', sites)
        this.sites = sites.site
        },
        error => {
          console.log(error)
          this.sites = []
        }
      )
  }

  onDeleteClick(site) {
    if (!site) return
    this._sitesService.removeSite(site.name)
      .subscribe(sites => this.sites = sites)
  }

  onAddNewSite() {
    console.log('adding')
    this._sitesService.addSite(this.profileForm.controls.name.value)
      .subscribe(data => {
        console.log(data)
      })
  }

  get f() {
    return this.profileForm.controls;
  }

}
