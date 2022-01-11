import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherItem } from 'src/app/pages/current-weather/weather-item';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { PageInformationService } from 'src/app/services/page-information.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.page.html',
  styleUrls: ['./current-weather.page.scss'],
})
export class CurrentWeatherPage implements OnInit {
  activatedRouteTitle: string;
  value = '';
  inputActive = false;

  cityLabelText = 'City';
  weatherLabelText = 'Current Weather';
  placeholderText = 'Enter a Name | ZIP Code of a city';
  currentDateLabelText = 'Today';
  currentLocationLabelText = 'Aktuellen Standort nutzen';

  humidityLabelText = 'Humidity';
  windLabelText = 'Wind';

  temperatureUnit = '°C';
  humidityUnit = ' %';
  windUnit = ' km/h';

  forecastLabelText = '5-Tage Trend';

  matIconSearch = 'search';
  matIconRefresh = 'refresh';
  cityImagePath =
    'https://media.istockphoto.com/vectors/silhouette-of-the-city-cityscape-background-simple-blue-texture-urban-vector-id1126979180?k=20&m=1126979180&s=612x612&w=0&h=hJ3QYTb1EZy5PHG87i8sz-haG9S-q48r12-W8-MuTMs=';

  weatherItem = {} as WeatherItem;
  currentGeolocation: boolean = false;

  weatherItemSub: Subscription = new Subscription();
  currentGeolocationSub: Subscription = new Subscription();

  private geolocation: Geolocation = new Geolocation();

  constructor(
    private _weatherDataService: WeatherDataService,
    public pageInformationService: PageInformationService
  ) {}

  ngOnInit(): void {
    this.weatherItemSub = this._weatherDataService
      .getWeatherItemsUpdateListener()
      .subscribe((weatherItem: WeatherItem) => {
        this.weatherItem = weatherItem;
      });
    this.currentGeolocationSub = this.pageInformationService
      .getcurrentGeolocationUpdateListener()
      .subscribe((currentGeolocation: boolean) => {
        this.currentGeolocation = currentGeolocation;
        this.updateInputPlaceholderData(this.currentGeolocation);
      });
    this.weatherItem.isEmpty = true;
  }

  getCityWeatherData(): void {
    if (this.currentGeolocation) {
      this.getCurrentLocationWeatherData();
    } else {
      this._weatherDataService.getCurrentWeatherData(this.value);
      this._weatherDataService.getForecastWeatherData(this.value);
    }
  }

  getCurrentLocationWeatherData(): void {
    this.geolocation.getCurrentPosition().then((position) => {
      this._weatherDataService.getCurrentWeatherDataLocation(
        position.coords.latitude,
        position.coords.longitude
      );
      this._weatherDataService.getForecastWeatherDataCurrentLocation(
        position.coords.latitude,
        position.coords.longitude
      );
    });
  }

  getDateOfCity(): Date {
    var localTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    var currentDateofCity = localTime + 1000 * this.weatherItem.currentDate;
    return new Date(currentDateofCity);
  }

  getDay(item: WeatherItem): Date {
    var localTime = new Date(item.currentDate * 1000);
    return localTime;
  }

  getWeatherIcon(iconID: string): string {
    const iconURL =
      this.pageInformationService.iconPath +
      iconID +
      this.pageInformationService.iconFileType;
    return iconURL;
  }

  updateInputPlaceholderData(currentGeoLocation: boolean) {
    if (currentGeoLocation) {
      this.getCurrentLocationWeatherData();
      this.placeholderText = 'Current Location';
      this.value = 'Current Location';
    } else {
      this.placeholderText = 'Enter a Name | ZIP Code of a city';
      this.value = '';
    }
  }

  ngOnDestroy(): void {
    this.weatherItemSub.unsubscribe();
    this.currentGeolocationSub.unsubscribe();
  }
}
