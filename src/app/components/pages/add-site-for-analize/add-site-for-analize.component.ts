import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { emailRegex } from '../../../constants/regExps';
import { GetAllSitesService} from '../../../services/getAllSites/get-all-sites.service'

@Component({
  selector: 'app-add-site-for-analize',
  templateUrl: './add-site-for-analize.component.html',
  styleUrls: ['./add-site-for-analize.component.css']
})
export class AddSiteForAnalizeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _getAllSitesService: GetAllSitesService
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
    email: ['', Validators.compose([
      Validators.required,
      Validators.pattern(emailRegex)
    ])]
  });

  ngOnInit() {
    this._getAllSitesService.getAll()
      .subscribe(
        sites => {
        this.sites = sites
        },
        error => {
          console.log(error)
        }
      )
  }

  onAddNewSite() {
    console.log('adding')
  }

  get f() {
    return this.profileForm.controls;
  }

}
