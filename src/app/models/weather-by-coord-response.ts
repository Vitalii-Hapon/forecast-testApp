import {IweatherDateBase} from './weather-by-name-response';

export interface IweatherByCoordResponse {
  current: ItodayWeatherResponse;
  daily: IdailyWeatherResponse[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface ItodayWeatherResponse extends IweatherDateBase {
  clouds: number;
  dew_point: number;
  feels_like: number;
  humidity: number;
  pop: number;
  pressure: number;
  rain?: number;
  snow?: number;
  sunrise: number;
  sunset: number;
  temp: number;
  uvi: number;
  wind_deg: number;
  wind_speed: number;
}

export interface IdailyWeatherResponse extends IweatherDateBase {
  clouds: number;
  dew_point: number;
  feels_like: IdayTemp;
  humidity: number;
  pop: number;
  pressure: number;
  rain?: number;
  snow?: number;
  sunrise: number;
  sunset: number;
  temp: IdayTemp;
  uvi: number;
  wind_deg: number;
  wind_speed: number;
}

export interface IdayTemp {
  morn: number;
  day: number;
  eve: number;
  night: number;
  min: number;
  max: number;
}
