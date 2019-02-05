import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import API from 'src/app/core/constants';
import { SitesService } from 'src/app/core/services/sites/sites.service'
import { ActionsService } from 'src/app/core/services/actions/actions.service';
import { CommonService } from 'src/app/core/services/common/common.service';
import { MzToastService } from 'ngx-materialize';

@Component({
  selector: 'app-add-site-for-analize',
  templateUrl: './add-site-for-analize.component.html',
  styleUrls: ['./add-site-for-analize.component.css']
})
export class AddSiteForAnalizeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _sitesService: SitesService,
    private _actionsService: ActionsService,
    private _commonService: CommonService,
    private _toastService: MzToastService
  ) { }

  sites: any[] = [];
  checkedSite: any;
  allActions: string[];
  siteActions: string[] = [];
  isOpenedModal: boolean = false;

  profileForm = this.fb.group({
    name: ['', Validators.compose([
      Validators.required,
      Validators.pattern(API.regExps.pathRegexp)
    ])],
    choosedEvents: ['default', Validators.compose([
      Validators.required
    ])]
  });

  ngOnInit() {
    window.addEventListener('keydown', (e) => this.onKeypress(e));

    this.getAllSites();
    this._actionsService.getAvailable()
      .then((data: any) => {
        this.allActions = data.actions
      });
  };

  ngOnDestroy(): void {
    window.removeEventListener('keydown', (e) => this.onKeypress(e))
  };

  onKeypress(event: any) {
    if (event.keyCode === 27) {
      if (this.isOpenedModal) {
        this.closeModal()
      } else {
        this.clearForm()
      }
    }
  }

  getAllSites() {
    this._sitesService.getAll()
      .then((data: any) => {
        this.sites = data.sites
      })
  };

  clearForm() {
    this.profileForm.controls.name.setValue('');
    this.siteActions = [];
  };

  onSelectNewAction(event: Event) {
    const value = (<HTMLSelectElement>event.target).value

    if (!this.siteActions.find(action => action === value)) {
      this.siteActions.push(value)
    };

    (<HTMLSelectElement>event.target).value = 'default';
  };


  applyChanges(changes: any) {
    
    Promise.all([
      (changes.name !== this.checkedSite.name) && this._sitesService.update(changes.uuid, changes.name),
      (changes.deletedActions.length !== 0) && this._actionsService.delete(changes.uuid, changes.deletedActions),
      (changes.newActionsList.length !== 0) && this._actionsService.update(changes.uuid, changes.newActionsList)
    ])
      .then(() => {
        this.getAllSites();
        this.closeModal()
      })
      .catch(err => {
        console.log(err)
      })
  };

  closeModal() {
    this.checkedSite = null;
    this.clearForm();
    this.isOpenedModal = false;
  };

  openModal(e: Event, idx: number | string) {
    if (!e) { return };

    this._actionsService.get(this.sites[idx].uuid)
      .then((data: {actions: string[]}) => {

        this.checkedSite = this.sites[idx];
        this.siteActions = data.actions;
        
        // this.fetchedEventsList = this._commonService.recursiveDeepCopy(data.events);
        // this.changedEventsList = this._commonService.recursiveDeepCopy(data.events);
      }
    );
    this.isOpenedModal = true;
  };

  deleteSite(site: any) {
    if (!site) return;
    
    this._sitesService.delete(site.uuid)
      .then(() => {
        this.sites = this.sites.filter((item: any) => item.uuid !== site.uuid)
      })
      .catch(err => {
        console.log(err)
      })
  };

  onAddNewSite() {
    this._sitesService.add(this.profileForm.controls.name.value)
      .then((data: {site: any}): void => {
        this._actionsService.update(data.site.uuid, this.siteActions);
        this.sites.push(data.site);
        this.clearForm();
      })
      .catch(err => {
        this._toastService.show(err.error.error, 4000, 'red', () => {});
      })
  };

  get f() {
    return this.profileForm.controls;
  }
}
