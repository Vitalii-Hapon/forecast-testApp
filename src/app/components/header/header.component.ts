import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';
import {RequestService} from '../../services/request.service';
import {Coord} from '../../models/classes';
import {Icity, Icoord} from '../../models/weather-by-name-response';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public cityInput: FormControl = this.fb.control('', Validators.required);
  public degreesInput: FormControl = this.fb.control(this.requestService.isCelsius$.value);
  private debounceTime = 750;
  private ngUnsubscribe: Subject<void> = new Subject();
  public favoriteCities: Icity[];

  constructor(private fb: FormBuilder,
              private requestService: RequestService) {
    this.favoriteCities = this.requestService.cities;
  }

  ngOnInit(): void {
    this.onLook();

    this.degreesInput.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(status => this.requestService.changeIsCelsius(status));
  }

  clearInput(): void {
    this.cityInput.reset();
  }

  onLook(): void {
    this.cityInput.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        debounceTime(this.debounceTime),
        filter( value => value))
      .subscribe(city => this.requestService.city$.next(city),
        error => console.log(error));
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  getCoord(): void {
    navigator.geolocation.getCurrentPosition(
      position => this.requestService.coord$.next(new Coord(position)),
      err => {
        console.log(err.message);
        alert('Geolocation is not supported. Look console for error message');
      });
  }

  selectCity(coord: Icoord): void {
    this.requestService.coord$.next(coord);
  }

  removeCity(city: Icity): void {
    this.requestService.removeFromStorage(city.name);
    this.favoriteCities = this.requestService.cities;
  }
}
