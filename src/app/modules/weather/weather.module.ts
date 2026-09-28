import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherHomeComponent } from './page/weather-home/weather-home.component';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { CityInfoCardComponent } from './components/city-info-card/city-info-card.component';
import { WikipediaService } from './services/wikipedia.service';

@NgModule({
  declarations: [
    WeatherHomeComponent,
    WeatherCardComponent,
    CityInfoCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    WeatherRoutingModule
  ],
  // WikipediaService não tem providedIn: 'root', precisa ser registrado aqui
  providers: [WikipediaService]
})
export class WeatherModule { }
