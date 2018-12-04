import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestAnalytic } from 'test-analytics';
import { API } from 'src/app/common/constants'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-analyst';
  list = [
    'click',
    'keypress',
    'input',
    'change'
  ];

  _testAnalytic: TestAnalytic;

  constructor() {
    this._testAnalytic = new TestAnalytic();
  };

  ngOnInit() {
    console.log(API)
    this._testAnalytic.listenDocument(this.list);
  };

  ngOnDestroy() {
    this._testAnalytic.killListenDocument(this.list);
  };
}
