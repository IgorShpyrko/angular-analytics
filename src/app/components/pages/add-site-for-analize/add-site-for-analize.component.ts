import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { pathRegexp } from '../../../constants/regExps';
import { SitesService } from '../../../services/sites/sites.service'
import { ActionsService } from 'src/app/services/actions/actions.service';
import { callbackify } from 'util';

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

  sites: any[] = [];
  checkedSite: {};
  eventsList:string[] = [];
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
    this.getActions();
  };

  getActions() {
    this._actionsService.getActionsList()
    .subscribe((data: string[]) => {
      this.actionsList = data
    },
    error => {
      console.log(error)
    })
  };

  getAllSites() {
    this._sitesService.getAllSites()
    .subscribe(
      (sites: {site: []}) => {
        this.sites = sites.site
      },
      error => {
        console.log(error)
      }
    );
  };

  getSubmitedActionsList(uuid, callback = null) {
    this._actionsService.getSubmitedActionsList(uuid)
    .subscribe((data: {events: string[]}) => {
      this.eventsList = data.events;

      if(callback) {
        callback()
      };
    },
    error => {
      console.log(error)
    });
  };

  attachEvents(uuid, eventsList, callback = null) {
    this._sitesService.attachEvents(uuid, eventsList)
      .subscribe((data): void => {
        console.log(data)
        if (callback) {
          callback()
        }
      },
      error => {
        console.log(error)
      });
  };

  deleteEvents(uuid, eventsList, callback = null) {
    this._sitesService.deleteEvents(uuid, eventsList)
      .subscribe(
        data => {
          console.log(data)
          if (callback) {
            callback()
          }
        },
        error => {
          console.log(error)
        }
      )
  };

  editSite(uuid, address, callback = null) {
    this._sitesService.editSite(uuid, address)
    .subscribe( () => {
        if (callback) {
          callback()
        }
      },
      error => {
        console.log(error)
      }
    );
  };

  deleteSite(uuid, callback = null) {
    this._sitesService.removeSite(uuid)
      .subscribe(
        () => {
          if (callback) {
            callback()
          }
        },
        error => {
          console.log(error)
        }
      );
  };

  clearForm() {
    this.profileForm.controls.name.setValue('');
    this.eventsList = [];
  };

  onSelectNewEvent(e) {
    const { value } = e.target
    
    if (!this.eventsList.find(event => event === value)) {
      this.eventsList.push(value)
    };

    e.target.value = 'default'
  };

  deleteAction(params) {
    this.eventsList.filter(event => event !== params.deleted)
    this.attachEvents(params.uuid, this.eventsList)
  };

  applyChanges(changes) {
    let isChangedAddress = false;
    let isAddedActionsList = false;
    let isDeletedActionsList = false;

    let newEvents = changes.eventsList.filter(event => {
      if (!this.actionsList.includes(event)) {
        return event
      }
    });

    console.log('this.actionsList :', this.eventsList);
    let deletedEvents = this.eventsList.filter(event => {
      if (!changes.eventsList.includes(event)) {
        return event
      }
    });

    console.log('newEvents', newEvents);
    console.log('deletedEvents :', deletedEvents);

    this.editSite(changes.uuid, changes.address, () => {
      isChangedAddress = true;
      this.getAllSites();
      this.closeModal(isAddedActionsList && isDeletedActionsList);
    });

    if (newEvents.length !== 0) {
      this.attachEvents(changes.uuid, newEvents, () => {
        isAddedActionsList = true;
        this.closeModal(isAddedActionsList && isDeletedActionsList);
      });
    } else {
      isAddedActionsList = true;
      this.closeModal(isAddedActionsList && isDeletedActionsList);
    }

    if (deletedEvents.length !== 0) {
      this.deleteEvents(changes.uuid, deletedEvents, () => {
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
    };
  };

  openModal(e, idx) {
    if (!e) return;

    this.getSubmitedActionsList(this.sites[idx].uuid,() => {
        this.checkedSite = this.sites[idx]
      }
    ) 
  };

  onDeleteClick(site) {
    if (!site) return
    this.deleteSite(site.uuid, () => {
      this.sites = this.sites.filter((item: any) => item.uuid !== site.uuid)
    })
  };

  onAddNewSite() {
    this._sitesService.addSite(this.profileForm.controls.name.value)
      .subscribe((data: {site:any}): void => {
        this.attachEvents(data.site.uuid, this.eventsList)

        this.sites.push(data.site);
        this.clearForm();
        
      }, error => {
        console.log(error)
      })
  };

  get f() {
    return this.profileForm.controls;
  }
}
