import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherItem } from 'src/app/pages/current-weather/weather-item';
import { WeatherDataService } from 'src/app/services/weather-data.service';
import { PageInformationService } from 'src/app/services/page-information.service';

@Component({
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.page.html',
  styleUrls: ['./five-days-forecast.page.scss'],
})
export class FiveDaysForecastPage implements OnInit {
  value = '';
  humidityLabelText = 'Humidity:';
  windLabelText = 'Wind:';

  temperatureUnit = '°C';
  humidityUnit = ' %';
  windUnit = ' km/h';
  fiveDayForecast: WeatherItem[] = [];
  forecastSub: Subscription = new Subscription();

  constructor(
    public _weatherDataService: WeatherDataService,
    public pageInformationService: PageInformationService
  ) {}

  ngOnInit() {
    this.forecastSub = this._weatherDataService
      .getForecastUpdateListener()
      .subscribe((forecast: WeatherItem[]) => {
        this.fiveDayForecast = forecast;
      });
  }

  getCityWeatherData(): void {
    this._weatherDataService.getForecastWeatherData(this.value);
  }

  getCurrentLocationWeatherData(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this._weatherDataService.getForecastWeatherDataCurrentLocation(
        position.coords.latitude,
        position.coords.longitude
      );
    });
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
  ngOnDestroy(): void {
    this.forecastSub.unsubscribe();
  }
}
