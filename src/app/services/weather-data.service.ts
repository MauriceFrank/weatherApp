import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Forecast } from '../pages/five-days-forecast/forecast';

import { WeatherItem } from '../pages/current-weather/weather-item';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private weatherItem = {} as WeatherItem;
  private fiveDayForecast: WeatherItem[] = [];

  private weatherItemUpdated = new BehaviorSubject<WeatherItem>(
    this.weatherItem
  );
  private forecastUpdated = new BehaviorSubject<WeatherItem[]>(
    this.fiveDayForecast
  );

  private _APIlinkCurrentWeather =
    'http://api.openweathermap.org/data/2.5/weather?q=';
  private _APIlinkfiveDayForecast =
    'http://api.openweathermap.org/data/2.5/forecast?q=';
  private _APIlinkCurrentLocation =
    'http://api.openweathermap.org/data/2.5/weather?lat=';
  private _APIlinkCurrentLocationForecast =
    'http://api.openweathermap.org/data/2.5/forecast?lat=';
  private _APIkey = 'f4cd20caafa1642d1ac56f1437d2a79c';
  private unit = 'metric';
  private language = 'en';

  constructor(private _http: HttpClient) {}

  getCurrentWeatherData(city: string) {
    this._http
      .get<any>(
        this._APIlinkCurrentWeather +
          city +
          '&APPID=' +
          this._APIkey +
          '&units=' +
          this.unit +
          '&lang=' +
          this.language
      )
      .subscribe((res) => {
        this.addWeatherItem(this.constructWeatherItem(res));
      });
  }

  getCurrentWeatherDataLocation(lat: any, lon: any) {
    this._http
      .get<any>(
        this._APIlinkCurrentLocation +
          lat +
          '&lon=' +
          lon +
          '&APPID=' +
          this._APIkey +
          '&units=' +
          this.unit +
          '&lang=' +
          this.language
      )
      .subscribe((res) => {
        this.addWeatherItem(this.constructWeatherItem(res));
      });
  }

  getForecastWeatherData(city: string) {
    this._http
      .get<any>(
        this._APIlinkfiveDayForecast +
          city +
          '&APPID=' +
          this._APIkey +
          '&units=' +
          this.unit +
          '&lang=' +
          this.language
      )
      .subscribe((forecast) => {
        this.fiveDayForecast = [];
        for (let i = 0; i < forecast.list.length; i = i + 8) {
          this.addWeatherItemForecast(
            this.constructWeatherListItem(forecast, i)
          );
        }
      });
  }

  getForecastWeatherDataCurrentLocation(lat: any, lon: any) {
    this._http
      .get<any>(
        this._APIlinkCurrentLocationForecast +
          lat +
          '&lon=' +
          lon +
          '&APPID=' +
          this._APIkey +
          '&units=' +
          this.unit +
          '&lang=' +
          this.language
      )
      .subscribe((forecast) => {
        this.fiveDayForecast = [];
        for (let i = 0; i < forecast.list.length; i = i + 8) {
          this.addWeatherItemForecast(
            this.constructWeatherListItem(forecast, i)
          );
        }
      });
  }

  constructWeatherItem(response: any): WeatherItem {
    const weatherItem: WeatherItem = {
      cityName: response.name,
      temperature: response.main.temp,
      description: response.weather[0].description,
      wind: response.wind.speed,
      humidity: response.main.humidity,
      countryCode: response.sys.country,
      currentDate: response.timezone,
      iconID: response.weather[0].icon,
      isEmpty: false,
    };
    return weatherItem;
  }

  constructWeatherListItem(response: any, index: number): WeatherItem {
    const weatherListItem: WeatherItem = {
      cityName: response.city.name,
      temperature: response.list[index].main.temp,
      description: response.list[index].weather[0].description,
      wind: response.list[index].wind.speed,
      humidity: response.list[index].main.humidity,
      countryCode: response.city.country,
      currentDate: response.list[index].dt,
      iconID: response.list[index].weather[0].icon,
      isEmpty: false,
    };
    return weatherListItem;
  }

  addWeatherItem(weatherItem: WeatherItem) {
    this.weatherItem = weatherItem;
    this.weatherItemUpdated.next(this.weatherItem);
  }

  addWeatherItemForecast(weatherItem: WeatherItem) {
    this.fiveDayForecast.push(weatherItem);
    this.forecastUpdated.next([...this.fiveDayForecast]);
  }

  getForecastUpdateListener(): Observable<any> {
    return this.forecastUpdated.asObservable();
  }
  getWeatherItemsUpdateListener(): Observable<any> {
    return this.weatherItemUpdated.asObservable();
  }
}
