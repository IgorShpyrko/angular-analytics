import { Component, OnInit } from '@angular/core';
import { listenDocument } from 'test-analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-analyst';

  ngOnInit() {
    console.log(Date.now())
    let list = ['click', 'keydown']
    console.log(listenDocument)
    listenDocument(list)
  }
}
