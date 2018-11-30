import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pathRegexp } from '../../../constants/regExps';
import { SitesService } from '../../../services/sites/sites.service'
import { ActionsService } from 'src/app/services/actions/actions.service';
import { CommonService } from 'src/app/services/common/common.service';

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
    private _commonService: CommonService
  ) { }

  sites: any[] = [];
  checkedSite: {};
  changedEventsList:string[] = [];
  fetchedEventsList:string[] = [];
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
    this.getAllSites();
    this.getAllActionsList();
  };

  getAllSites() {
    this._sitesService.getAllSites((sites: {site: []}) => {
      this.sites = sites.site
    });
  };

  getAllActionsList() {
    this._actionsService.getAllActionsList((data: string[]) => {
      this.actionsList = data
    });
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
    let isChangedAddress = false;
    let isAddedActionsList = false;
    let isDeletedActionsList = false;

    console.log('changedEventsList :', changes.changedEventsList);
    console.log('this.fetchedEventsList :', this.fetchedEventsList);

    let newEvents = changes.changedEventsList.filter(event => {
      if (!this.fetchedEventsList.includes(event)) {
        return event
      }
    });

    let deletedEvents = this.fetchedEventsList.filter(event => {
      if (!changes.changedEventsList.includes(event)) {
        return event
      }
    });

    console.log('changes :', changes);
    console.log('newEvents :', newEvents);
    console.log('deletedEvents :', deletedEvents);

    this._sitesService.editSite(changes.uuid, changes.address, () => {
      isChangedAddress = true;
      this.getAllSites();
      this.closeModal(isAddedActionsList && isDeletedActionsList);
    });

    if (newEvents.length !== 0) {
      this._sitesService.attachEvents(changes.uuid, newEvents, () => {
        isAddedActionsList = true;
        this.closeModal(isAddedActionsList && isDeletedActionsList);
      });
    } else {
      isAddedActionsList = true;
      this.closeModal(isAddedActionsList && isDeletedActionsList);
    }

    if (deletedEvents.length !== 0) {
      this._sitesService.deleteEvents(changes.uuid, deletedEvents, () => {
        isDeletedActionsList = true;
        this.closeModal(isAddedActionsList && isChangedAddress);
      });
    } else {
      isDeletedActionsList = true;
      this.closeModal(isAddedActionsList && isChangedAddress);
    }
  };

  closeModal(params: boolean) {
    if (params) {
      this.checkedSite = null
      this.clearForm()
    };
  };

  openModal(e, idx) {
    if (!e) return;

    this._actionsService.getSubmitedActionsList(
      this.sites[idx].uuid,
      (data: {events: string[]}) => {
        this.checkedSite = this.sites[idx];
        this.fetchedEventsList = this._commonService.recursiveDeepCopy(data.events);
        this.changedEventsList = this._commonService.recursiveDeepCopy(data.events);
      }
    ) 
  };

  onDeleteClick(site) {
    if (!site) return
    this._sitesService.removeSite(site.uuid, () => {
      this.sites = this.sites.filter((item: any) => item.uuid !== site.uuid)
    })
  };

  onAddNewSite() {
    this._sitesService.addSite(
      this.profileForm.controls.name.value,
      (data: {site:any}): void => {
        this._sitesService.attachEvents(data.site.uuid, this.changedEventsList);
        this.sites.push(data.site);
        this.clearForm();
      });
  };

  get f() {
    return this.profileForm.controls;
  }
}
