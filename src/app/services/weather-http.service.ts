import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Icoord, IcurrentWeatherResponse} from '../models/weather-by-name-response';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {IweatherByCoordResponse} from '../models/weather-by-coord-response';

@Injectable({
  providedIn: 'root'
})

export class WeatherHttpService {
  public units: 'metric' | 'imperial' = 'metric';
  readonly API_KEY = `&appid=${environment.API_KEY}`;
  readonly URL = `${environment.URL}`;
  public exclude = 'minutely,hourly,alerts';

  constructor(private http: HttpClient) {
  }

  getWeatherByCityName(cityName: string,): Observable<IweatherByCoordResponse> {
    return this.http.get<IcurrentWeatherResponse>(`${this.getURLbyCity(cityName)}`)
      .pipe(
        switchMap(
          resp => this.getWeatherByLocation(resp.coord)
        ));
  }

  getWeatherByLocation(coord: Icoord): Observable<IweatherByCoordResponse> {
    return this.http.get<IweatherByCoordResponse>(`${this.getURLbyLocation(coord.lat, coord.lon)}`);
  }

  getURLbyCity(cityName: string): string {
    return `${this.URL}weather?q=${cityName}&units=${this.units}${this.API_KEY}`;
  }

  getURLbyLocation(lat: number, lon: number): string {
    return `${this.URL}onecall?lat=${lat}&lon=${lon}&units=${this.units}&exclude=${this.exclude}${this.API_KEY}`;
  }

  changeUnits(state: boolean): void {
    this.units = state ? 'metric' : 'imperial';
  }
}
