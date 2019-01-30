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
  changedEventsList: string[] = [];
  fetchedEventsList: string[] = [];
  actionsList: string[];
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
    window.addEventListener('keydown', (e) => this.onKeypress(e))
    this.getAllSites();
    this._actionsService.getAvailable()
      .then ((data: string[]) => {
        this.actionsList = data
      });
  };

  ngOnDestroy(): void {
    window.removeEventListener('keydown', (e) => this.onKeypress(e))
  };

  onKeypress(e) {
    if (e.keyCode === 27) {
      if (this.isOpenedModal) {
        this.closeModal()
      } else {
        this.clearForm()
      }
    }
  }

  getAllSites() {
    this._sitesService.getAll()
      .then((sites: []) => {
        this.sites = sites
      })
  };

  clearForm() {
    this.profileForm.controls.name.setValue('');
    this.changedEventsList = [];
    this.fetchedEventsList = [];
  };

  onSelectNewEvent(e: Event) {
    const value = (<HTMLSelectElement>event.target).value

    if (!this.changedEventsList.find(event => event === value)) {
      this.changedEventsList.push(value)
    };

    (<HTMLSelectElement>event.target).value = 'default'
    console.log(this.changedEventsList)
    console.log(!this.isOpenedModal)
    console.log(this.changedEventsList.length)
  };

  deleteAction(params: any) {
    this.changedEventsList.filter(event => event !== params.deleted)
    this._actionsService.update(params.uuid, this.changedEventsList)
  };

  applyChanges(changes: any) {
    const newEvents = changes.changedEventsList.filter((event: string) => {
      if (!this.fetchedEventsList.includes(event)) {
        return event
      }
    });

    Promise.all([
      (changes.address !== this.checkedSite.address) && this._sitesService.update(changes.uuid, changes.address),
      (newEvents.length !== 0) && this._actionsService.update(changes.uuid, newEvents)
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
      .then((data: {events: string[]}) => {
        this.checkedSite = this.sites[idx];
        this.fetchedEventsList = this._commonService.recursiveDeepCopy(data.events);
        this.changedEventsList = this._commonService.recursiveDeepCopy(data.events);
      }
    );
    this.isOpenedModal = true;
  };

  onDeleteClick(site: any) {
    if (!site) return;
    
    this._sitesService.delete(site.uuid)
      .then(() => {
        this.sites = this.sites.filter((item: any) => item.uuid !== site.uuid)
      })
  };

  showToast(message: string) {
    this._toastService.show(message, 4000, 'red', () => {});
  }

  onAddNewSite() {
    this._sitesService.add(this.profileForm.controls.name.value)
      .then((data: {site: any}): void => {
        this._actionsService.update(data.site.uuid, this.changedEventsList);
        this.sites.push(data.site);
        this.clearForm();
      })
      .catch(err => {
        this.showToast(err.error.error);
      })
  };

  get f() {
    return this.profileForm.controls;
  }
}
