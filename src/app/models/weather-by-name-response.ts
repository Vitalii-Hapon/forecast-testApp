export interface IcurrentWeatherResponse extends IweatherDateBase{
  base: 'stations';
  clouds: Iclouds;
  cod: number;
  coord: Icoord;
  id: number;
  main: Imain;
  name: string;
  sys: Isys;
  timezone: number;
  visibility: number;
  wind: Iwind;
}

export interface Iclouds {
  all: number;
}

export interface Icoord {
  lat: number;
  lon: number;
}

export interface Imain {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface Isys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface Iwind {
  deg: number;
  speed: number;
}

export interface Iweather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface IweatherDateBase {
  dt: number;
  weather: Iweather[];
}

export interface Icity {
  name: string;
  coord: Icoord;
}
