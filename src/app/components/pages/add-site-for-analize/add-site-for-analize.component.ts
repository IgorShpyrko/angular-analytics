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

  sites: string[] = [];
  checkedSite: number;
  eventList:string[] = [];
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

  ngOnInit() {
    this._sitesService.getAllSites()
      .subscribe(
        (sites: {site: []}) => {
          this.sites = sites.site
        },
        error => {
          console.log(error)
        }
      );

      this._actionsService.getActionsList()
      .subscribe((data: string[]) => {
        console.log(data)
        this.actionsList = data
      },
      error => {
        console.log(error)
      })
  };

  onSelectNewEvent(e) {
    const { value } = e.target
    
    if (!this.eventList.find(event => event === value)) {
      this.eventList.push(value)
    };

    e.target.value = 'default'
  };

  applyChanges(changes) {

    // TODO: add change site name


  }

  closeModal(params: boolean) {
    if (params) {
      this.checkedSite = -1
    }
  }

  openModal(e, idx) {
    if (!e) {
      this.checkedSite = -1;
      return;
    }
    this.checkedSite = idx.toString();
  }

  onDeleteClick(site) {
    if (!site) return
    this._sitesService.removeSite(site.uuid)
      .subscribe(
        data => {
          this.sites = this.sites.filter( (item: any) => item.uuid !== site.uuid )
        },
        error => {
          console.log(error)
        }
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
          });

        this.sites.push(data.site);
        this.profileForm.controls.name.setValue('');
        this.eventList = [];
        
      }, error => {
        console.log(error)
      })
  }

  get f() {
    return this.profileForm.controls;
  };

}
