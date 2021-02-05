import {IdailyWeatherResponse, IdayTemp, IweatherByCoordResponse} from './weather-by-coord-response';
import {Icoord, Iweather} from './weather-by-name-response';

export class Coord implements Icoord {
  public lat: number;
  public lon: number;

  constructor(position: GeolocationPosition) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
  }
}

export class DailyWeather {
  public temp: IdayTemp;
  public averageTemp: string;
  public weather: Iweather[];
  public date: Date;
  constructor(weatherResponse: IdailyWeatherResponse) {
    this.temp = weatherResponse.temp;
    this.weather = weatherResponse.weather;
    this.date = new Date(weatherResponse.dt * 1000);
    this.averageTemp = ((weatherResponse.temp.morn +
      weatherResponse.temp.day +
      weatherResponse.temp.eve +
      weatherResponse.temp.night) / 4).toFixed(0);
  }
}

export class Weather {
  public cityCoord: Icoord;
  public cityName: string;
  public currentTemp: number;
  public currentTime: number;
  public currentWeather: Iweather;
  public dailyWeather: DailyWeather[];
  public timezoneOffset: number;

  constructor(weatherResponse: IweatherByCoordResponse) {
    this.cityCoord = {
      lat: weatherResponse.lat,
      lon: weatherResponse.lon,
    };
    this.cityName = weatherResponse
      .timezone
      .replace(/^.*\//, '')
      .replace(/_/, ' ');
    this.currentTemp = weatherResponse.current.temp;
    this.currentTime = (weatherResponse.current.dt );
    this.currentWeather = weatherResponse.current.weather[0];
    this.dailyWeather = Array.from(weatherResponse.daily, (day) => new DailyWeather(day));
    this.timezoneOffset = weatherResponse.timezone_offset;
  }
}
