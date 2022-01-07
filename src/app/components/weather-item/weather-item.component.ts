/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherItem } from 'src/app/dataModels/weather-item';
import { WeatherDataService } from 'src/app/dataServices/weather-data.service';

@Component({
  selector: 'app-weather-item',
  templateUrl: './weather-item.component.html',
  styleUrls: ['./weather-item.component.scss'],
})
export class WeatherItemComponent implements OnInit {

  value = '';
  currentLocationValue: boolean = false;
  inputActive = false;

  cityLabelText = 'Stadt';
  weatherLabelText = 'Aktuelles Wetter';
  placeholderText = 'Name | PLZ';
  currentDateLabelText = 'Heute';
  currentLocationLabelText = 'Aktuellen Standort nutzen';

  humidityLabelText = 'Luftfeuchtigkeit';
  windLabelText = 'Wind';

  temperatureUnit = '°C';
  humidityUnit = ' %';
  windUnit = ' km/h';

  forecastLabelText = '5-Tage Trend';

  matIconSearch = 'search';
  matIconRefresh = 'refresh';
  cityImagePath =
    'https://i.pinimg.com/originals/55/c7/8a/55c78aa24fb722350d6832301e973ba4.png';
  iconPath = 'http://openweathermap.org/img/w/';
  iconFileType = '.png';

  weatherItem = {} as WeatherItem;
  fiveDayForecast: WeatherItem[] = [];

  weatherItemSub: Subscription = new Subscription();
  forecastSub: Subscription = new Subscription();

  constructor(private _weatherDataService: WeatherDataService) {}

  ngOnInit(): void {
    this.weatherItemSub = this._weatherDataService
      .getWeatherItemsUpdateListener()
      .subscribe((weatherItem: WeatherItem) => {
        this.weatherItem = weatherItem;
      });

    this.forecastSub = this._weatherDataService
      .getForecastUpdateListener()
      .subscribe((forecast: any) => {
        this.fiveDayForecast = [];
        for (let i = 0; i < forecast.list.length; i = i + 8) {
          const weatherItem: WeatherItem = {
            cityName: forecast.city.name,
            temperature: forecast.list[i].main.temp,
            description: forecast.list[i].weather[0].description,
            wind: forecast.list[i].wind.speed,
            humidity: forecast.list[i].main.humidity,
            countryCode: forecast.city.country,
            currentDate: forecast.list[i].dt,
            iconID: forecast.list[i].weather[0].icon,
            isEmpty: false,
          };
          this.fiveDayForecast.push(weatherItem);
        }
      });
    this.weatherItem.isEmpty = true;
  }

  getWeatherData(): void {
    if (this.currentLocationValue) {
      this.getCurrentLocationWeatherData();
    } else {
      this.getCityWeatherData();
    }
  }

  getCityWeatherData(): void {
    this._weatherDataService.getCurrentWeatherData(this.value);
    this._weatherDataService.getForecastWeatherData(this.value);
  }

  getCurrentLocationWeatherData(): void {
    navigator.geolocation.getCurrentPosition((position) => {
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
    const iconURL = this.iconPath + iconID + this.iconFileType;
    return iconURL;
  }

  setCurrentLocationValue(event: any) {
    this.currentLocationValue = event.checked;
    this.inputActive = event.checked;
    if (event.checked) {
      this.value = '';
      this.cityLabelText = 'Aktueller Standort';
    } else {
      this.cityLabelText = 'Stadt';
    }
  }

  ngOnDestroy(): void {
    this.weatherItemSub.unsubscribe();
    this.forecastSub.unsubscribe();
  }

}
