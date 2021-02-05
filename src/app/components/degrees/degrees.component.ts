import {Component, OnDestroy, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-degrees',
  templateUrl: './degrees.component.html',
  styleUrls: ['./degrees.component.scss']
})
export class DegreesComponent implements OnInit, OnDestroy {
  public isCelsius = true;
  private ngUnsubscribe: Subject<void> = new Subject();
  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.isCelsius$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.isCelsius = value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }
}
