import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  faDroplet,
  faTemperatureHigh,
  faTemperatureLow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../../../../models/interfaces/weather-data.interface';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent {
  @Input() weatherData!: WeatherData;

  readonly minTemperatureIcon = faTemperatureLow;
  readonly maxTemperatureIcon = faTemperatureHigh;
  readonly humidityIcon = faDroplet;
  readonly windIcon = faWind;
} 