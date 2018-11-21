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

  mockSites = [
    {name: 'first site'},
    {name: 'second site'},
    {name: 'third site'},
    {name: 'forth site'},
    {name: 'fifth site'},
    {name: 'sixth site'},
  ];

  sites;

  profileForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(pathRegexp)
    ])]
  });

  ngOnInit() {
    // TODO: uncomment when server is ready
    this._sitesService.getAll()
      .subscribe(
        sites => {
        this.sites = sites
        },
        error => {
          console.log(error)
          this.sites = this.mockSites
        }
      )
  }

  onDeleteClick(site) {
    if (!site) return
    this._sitesService.removeSite(site.name)
      .subscribe(sites => this.sites = sites)
  }

  onAddNewSite() {
    this._sitesService.addSite(this.profileForm.controls.name.value)
  }

  get f() {
    return this.profileForm.controls;
  }

}
