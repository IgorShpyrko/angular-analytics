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
  loadCount: number;

  constructor() {
    this._testAnalytic = new TestAnalytic();
  };

  ngOnInit() {
    console.log(window.history.state)
    console.log(document.location)
    console.log(document.location.href)

    // window.history.replaceState(null, 'testing', document.location.origin)
    this._testAnalytic.listenDocument();
  };

  ngOnDestroy() {
    this._testAnalytic.killListenDocument();
  };

}
