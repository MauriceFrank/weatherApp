import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageInformationService {
  public test: string;
  public pageTitle: string = 'Weather Guru';
  public pageSubTitle: string = 'Making your sun shine';
  iconPath: string = 'http://openweathermap.org/img/w/';
  iconFileType: string = '.png';
  currentLocationLabel: string = 'Current Location';
  public appPages = [
    { title: 'Current Weather', url: 'weather/current-weather', icon: 'sunny' },
    {
      title: '5-Days Forecast',
      url: 'weather/five-days-forecast',
      icon: 'calendar',
    },
  ];
  public currentGeolocation: boolean = false;
  private currentGeolocationUpdated = new BehaviorSubject<boolean>(
    this.currentGeolocation
  );

  setCurrentGeolocation(currentGeolocation: boolean) {
    this.currentGeolocation = currentGeolocation;
    this.currentGeolocationUpdated.next(this.currentGeolocation);
  }

  getcurrentGeolocationUpdateListener(): Observable<any> {
    return this.currentGeolocationUpdated.asObservable();
  }
}
