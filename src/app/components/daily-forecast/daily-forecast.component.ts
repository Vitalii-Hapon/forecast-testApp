import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {DailyWeather} from '../../models/classes';

@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.component.html',
  styleUrls: ['./daily-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DailyForecastComponent implements OnInit {
  @Input() dayWeather!: DailyWeather;

  constructor() {
  }

  ngOnInit(): void {
  }

}
