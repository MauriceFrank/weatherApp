import { Component } from '@angular/core';
import { PageInformationService } from './services/page-information.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public labels = ['Current Location'];
  public currentGeoLocation: boolean = false;
  constructor(public pageInformationService: PageInformationService) {}

  setCurrentGeolocation() {
    this.pageInformationService.setCurrentGeolocation(this.currentGeoLocation);
  }
}
