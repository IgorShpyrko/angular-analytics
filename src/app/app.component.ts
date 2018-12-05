import { Component, OnInit, OnDestroy } from '@angular/core';
import { TestAnalytic } from 'test-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'front-analyst';

  _testAnalytic: TestAnalytic;

  constructor() {
    this._testAnalytic = new TestAnalytic();
  };

  ngOnInit() {
    this._testAnalytic.listenDocument();
  };

  ngOnDestroy() {
    this._testAnalytic.killListenDocument();
  };
}
