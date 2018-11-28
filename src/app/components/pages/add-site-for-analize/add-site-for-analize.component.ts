import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pathRegexp } from '../../../constants/regExps';
import { SitesService } from '../../../services/sites/sites.service'
import { ActionsService } from 'src/app/services/actions/actions.service';

@Component({
  selector: 'app-add-site-for-analize',
  templateUrl: './add-site-for-analize.component.html',
  styleUrls: ['./add-site-for-analize.component.css']
})
export class AddSiteForAnalizeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _sitesService: SitesService,
    private _actionsService: ActionsService
  ) { }

  sites;
  checkedSite: number;
  eventList:string[];
  actionsList:string[];

  profileForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(pathRegexp)
    ])],
    choosedEvents: ['default', Validators.compose([
      Validators.required
    ])]
  });

  mockEventList = [
    'click',
    'input',
    'hover'
  ];

  ngOnInit() {
    this.eventList = [];

    this._sitesService.getAllSites()
      .subscribe(
        (sites: {site: []}) => {
          this.sites = sites.site
        },
        error => {
          console.log(error)
          this.sites = []
        }
      );

    this.actionsList = this._actionsService.getActionsList()
  };

  onSelectEvent(e) {
    const { value } = e.target
    
    if (!this.eventList.find(event => event === value)) {
      this.eventList.push(value)
    };

    e.target.value = 'default'
  };

  onBlur(e, idx) {
    if (this.checkedSite === idx) {
      this.checkedSite = -1;
      return
    }
  }

  closeModal(event) {
    if (event) {
      console.log('closing')
      this.checkedSite = -1
    }
  }

  openModal(e, idx) {
    if (!e) {
      this.checkedSite = -1;
      return;
    }
    console.log(idx)
    this.checkedSite = idx.toString();
    console.log(e.target);
    console.log(this.checkedSite);
  }

  changeSite(e) {
    console.log('changing')
    console.log(e)
  }

  onDeleteClick(site) {
    if (!site) return
    this._sitesService.removeSite(site.uuid)
      .subscribe(
        this.sites = this.sites.filter(thisSite => thisSite.uuid !== site.uuid)
      )
  }

  onAddNewSite() {
    this._sitesService.addSite(this.profileForm.controls.name.value)
      .subscribe((data: {site:any}): void => {
        this._sitesService.attachEvents(data.site.uuid, this.eventList)
          .subscribe((data): void => {
            console.log(data)
          },
          error => {
            console.log(error)
          })
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
