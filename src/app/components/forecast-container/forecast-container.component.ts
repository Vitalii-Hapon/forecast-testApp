import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherHttpService} from '../../services/weather-http.service';
import {RequestService} from '../../services/request.service';
import {Subject, throwError} from 'rxjs';
import {catchError, switchMap, takeUntil} from 'rxjs/operators';
import {Weather} from '../../models/classes';
import {Icoord} from '../../models/weather-by-name-response';

@Component({
  selector: 'app-forecast-container',
  templateUrl: './forecast-container.component.html',
  styleUrls: ['./forecast-container.component.scss']
})

export class ForecastContainerComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject();
  public weather!: Weather;

  constructor(private requestService: RequestService,
              private weatherHttpService: WeatherHttpService) {
  }

  ngOnInit(): void {
    this.cityNameRequestSubscription();

    this.cityLocationRequestSubscription();

    this.isCelsiusSubscription();
  }

  cityNameRequestSubscription(): void {
    this.requestService.city$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        switchMap(city => this.weatherHttpService
          .getWeatherByCityName(city)),
        catchError(err => throwError(err)))
      .subscribe(weather => {
          this.weather = new Weather(weather);
          this.saveCityParams(this.weather.cityName, this.weather.cityCoord);
        },
        error1 => {
          alert(`this city does not found`);
          this.cityNameRequestSubscription();
        });
  }

  cityLocationRequestSubscription(): void {
    this.requestService.coord$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(coord => this.weatherHttpService
          .getWeatherByLocation(coord)
          .subscribe(
            weather => {
              this.weather = new Weather(weather);
              this.saveCityParams(this.weather.cityName, this.weather.cityCoord);
            }),
        err => console.log(err)
      );
  }

  getLastCity(): void {
    this.requestService.getLastCity();
  }

  isCelsiusSubscription(): void {
    this.requestService.isCelsius$
      .pipe(
        takeUntil(this.ngUnsubscribe))
      .subscribe(state => {
        this.weatherHttpService.changeUnits(state);
        this.getLastCity();
      });
  }

  saveCityParams(city: string, coord: Icoord): void {
    this.requestService.addToStorage(city, coord);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
