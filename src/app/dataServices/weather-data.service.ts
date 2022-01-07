import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Forecast } from '../dataModels/forecast';
import { WeatherItem } from '../dataModels/weather-item';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  private weatherItem = {} as WeatherItem;
  private forecastItems: any;

  private weatherItemUpdated = new Subject<WeatherItem>();
  private forecastUpdated = new Subject<Forecast>();

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
  private language = 'de';

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
        const weatherItem: WeatherItem = {
          cityName: res.name,
          temperature: res.main.temp,
          description: res.weather[0].description,
          wind: res.wind.speed,
          humidity: res.main.humidity,
          countryCode: res.sys.country,
          currentDate: res.timezone,
          iconID: res.weather[0].icon,
          isEmpty: false,
        };
        this.addWeatherItem(weatherItem);
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
        const weatherItem: WeatherItem = {
          cityName: res.name,
          temperature: res.main.temp,
          description: res.weather[0].description,
          wind: res.wind.speed,
          humidity: res.main.humidity,
          countryCode: res.sys.country,
          currentDate: res.timezone,
          iconID: res.weather[0].icon,
          isEmpty: false,
        };
        this.addWeatherItem(weatherItem);
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
      .subscribe((res) => {
        this.addWeatherItemForecast(res);
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
      .subscribe((res) => {
        this.addWeatherItemForecast(res);
      });
  }

  addWeatherItem(weatherItem: WeatherItem) {
    this.weatherItem = weatherItem;
    this.weatherItemUpdated.next(this.weatherItem);
  }

  addWeatherItemForecast(weatherForecast: any) {
    this.forecastItems = weatherForecast;
    this.forecastUpdated.next(this.forecastItems);
  }

  getForecastUpdateListener(): Observable<any> {
    return this.forecastUpdated.asObservable();
  }
  getWeatherItemsUpdateListener(): Observable<any> {
    return this.weatherItemUpdated.asObservable();
  }
}
