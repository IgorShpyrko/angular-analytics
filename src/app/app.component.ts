import { Component, OnDestroy } from '@angular/core';
import { TestAnalytic } from 'test-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'front-analyst';

  _testAnalytic: TestAnalytic;
  loadCount: number;

  constructor() {
    this._testAnalytic = new TestAnalytic();
    this._testAnalytic.listenDocument();
  };

  ngOnDestroy() {
    this._testAnalytic.killListenDocument();
  };
}

