import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MaterialsModule} from './materials/materials.module';
import {ReactiveFormsModule} from '@angular/forms';
import { TodayForecastComponent } from './components/today-forecast/today-forecast.component';
import { DailyForecastComponent } from './components/daily-forecast/daily-forecast.component';
import { ForecastContainerComponent } from './components/forecast-container/forecast-container.component';
import {HttpClientModule} from '@angular/common/http';
import { DegreesComponent } from './components/degrees/degrees.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodayForecastComponent,
    DailyForecastComponent,
    ForecastContainerComponent,
    DegreesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
