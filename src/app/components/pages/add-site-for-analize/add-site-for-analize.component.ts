import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { API } from 'src/app/common/constants';
import { SitesService } from 'src/app/common/services/sites/sites.service'
import { ActionsService } from 'src/app/common/services/actions/actions.service';
import { CommonService } from 'src/app/common/services/common/common.service';
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
  changedEventsList: string[] = [];
  fetchedEventsList: string[] = [];
  actionsList: string[];

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
    this.getAllSites();
    this._actionsService.getAllActionsList()
      .then ((data: string[]) => {
        this.actionsList = data
      });
  };

  getAllSites() {
    this._sitesService.getAllSites()
      .then((sites: {site: []}) => {
        this.sites = sites.site
      })
  };

  clearForm() {
    this.profileForm.controls.name.setValue('');
    this.changedEventsList = [];
    this.fetchedEventsList = [];
  };

  onSelectNewEvent(e) {
    const { value } = e.target

    if (!this.changedEventsList.find(event => event === value)) {
      this.changedEventsList.push(value)
    };

    e.target.value = 'default'
  };

  deleteAction(params) {
    this.changedEventsList.filter(event => event !== params.deleted)
    this._sitesService.attachEvents(params.uuid, this.changedEventsList)
  };

  applyChanges(changes) {
    const newEvents = changes.changedEventsList.filter(event => {
      if (!this.fetchedEventsList.includes(event)) {
        return event
      }
    });

    const deletedEvents = this.fetchedEventsList.filter(event => {
      if (!changes.changedEventsList.includes(event)) {
        return event
      }
    });

    Promise.all([
      (changes.address !== this.checkedSite.address) && this._sitesService.editSite(changes.uuid, changes.address),
      (newEvents.length !== 0) && this._sitesService.attachEvents(changes.uuid, newEvents),
      (deletedEvents.length !== 0) && this._sitesService.deleteEvents(changes.uuid, deletedEvents)
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
    this.checkedSite = null
    this.clearForm()
  };

  openModal(e, idx) {
    if (!e) { return };

    this._actionsService.getSubmitedActionsList(this.sites[idx].uuid)
      .then((data: {events: string[]}) => {
        this.checkedSite = this.sites[idx];
        this.fetchedEventsList = this._commonService.recursiveDeepCopy(data.events);
        this.changedEventsList = this._commonService.recursiveDeepCopy(data.events);
      }
    )
  };

  onDeleteClick(site) {
    if (!site) { return }
    this._sitesService.removeSite(site.uuid)
      .then(() => {
        this.sites = this.sites.filter((item: any) => item.uuid !== site.uuid)
      })
  };

  showToast(message) {
    this._toastService.show(message, 4000, 'red', () => {});
  }

  onAddNewSite() {
    this._sitesService.addSite(this.profileForm.controls.name.value)
      .then((data: {site: any}): void => {
        console.log('data :', data);
        this._sitesService.attachEvents(data.site.uuid, this.changedEventsList);
        this.sites.push(data.site);
        this.clearForm();
      })
      .catch(err => {
        console.log(err)
        // this.showToast(err.error.error);
      })
  };

  get f() {
    return this.profileForm.controls;
  }
}
