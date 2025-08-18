import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherHomeComponent } from './page/weather-home/weather-home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { WeatherService } from './services/weather.service';

@NgModule({
  declarations: [
    WeatherHomeComponent,
    WeatherCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    WeatherRoutingModule
  ],
  providers: [WeatherService]
})
export class WeatherModule { } 