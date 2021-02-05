import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DailyWeather} from '../../models/classes';
import {Iweather} from '../../models/weather-by-name-response';

@Component({
  selector: 'app-today-forecast',
  templateUrl: './today-forecast.component.html',
  styleUrls: ['./today-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodayForecastComponent implements OnInit {
  @Input() todayWeather!: DailyWeather;
  @Input() currentCity!: string;
  @Input() currentTemp!: number;
  @Input() currentWeather!: Iweather;
  @Input() currentDate!: number;
  @Input() currentTimeOffset!: number;
  public localTimeOffset: number = new Date().getTimezoneOffset() * 60 * 1000;

  constructor() {
  }

  ngOnInit(): void {
  }

}
