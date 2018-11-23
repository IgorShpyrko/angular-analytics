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
  checkedSite: number;

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
          this.sites = sites.site
        },
        error => {
          console.log(error)
          this.sites = []
        }
      )
  }

  onBlur(e, idx) {
    if (this.checkedSite === idx) {
      this.checkedSite = -1;
      return
    }
  }

  initChangeMode(e, idx) {
    if (!e) {
      this.checkedSite = -1;
      return;
    }
    console.log(idx)
    this.checkedSite = +idx;
    console.log(e.target)
  }

  changeSiteValue(e) {
    console.log('changing')
    console.log(e.target.value)
  }

  onDeleteClick(site) {
    if (!site) return
    console.log(site)
    this._sitesService.removeSite(site.id)
      .subscribe(
        this.sites = this.sites.filter(thisSite => thisSite.id !== site.id)
      )
  }

  onAddNewSite() {
    this._sitesService.addSite(this.profileForm.controls.name.value)
      .subscribe((data: {site:any}): void => {
        this.sites.push(data.site)
        this.profileForm.controls.name.setValue('')
      }, error => {
        console.log(error)
      })
  }

  get f() {
    return this.profileForm.controls;
  }

}
