import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Current Weather', url: '/folder/', icon: 'sunny' },
    { title: '5-Days Forecast', url: '/folder/', icon: 'calendar' }
  ];
  public labels = ['Current Location'];
  constructor() {}
}
