import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {Icity, Icoord} from '../models/weather-by-name-response';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  public city$: Subject<string> = new Subject();
  public coord$: Subject<Icoord> = new Subject();
  public cities: Icity[];
  public newCity$: Subject<Icity> = new Subject();
  public isCelsius$: BehaviorSubject<boolean>;

  constructor() {
    if (localStorage.getItem('isCelsius')) {
      this.isCelsius$ = new BehaviorSubject(JSON.parse(localStorage.getItem('isCelsius') || 'true'));
    } else {
      this.isCelsius$ = new BehaviorSubject<boolean>(true);
    }
    this.cities = JSON.parse(localStorage.getItem('cities') || '[]');
  }

  changeIsCelsius(state: boolean): void {
    this.isCelsius$.next(state);
    localStorage.setItem('isCelsius', JSON.stringify(state));
  }

  addToStorage(name: string, coord: Icoord): void {
    if (!this.cities.find(el => el.name === name)) {
      this.cities.push({name, coord});
      localStorage.setItem('cities', JSON.stringify(this.cities));
      this.newCity$.next({name, coord});
    }

    localStorage.setItem('lastCity', JSON.stringify(coord));
  }

  removeFromStorage(name: string): void {
    this.cities = this.cities.filter(el => el.name !== name);
    localStorage.setItem('cities', JSON.stringify(this.cities));
    if (this.cities.length === 0) {
      localStorage.removeItem('lastCity');
    }
  }

  getLastCity(): void {
    if (localStorage.getItem('lastCity')) {
      this.coord$.next(JSON.parse(localStorage.getItem('lastCity') || ''));
    }
  }
}
