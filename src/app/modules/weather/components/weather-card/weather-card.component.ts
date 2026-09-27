import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  faCloud,
  faDroplet,
  faMoon,
  faSun,
  faTemperatureHigh,
  faTemperatureHalf,
  faTemperatureLow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { WeatherData } from '../../../../models/interfaces/weather-data.interface';
import {
  getConditionGroup,
  getTemperatureBand,
} from '../../../../core/utils/weather-theme.util';

const HERO_IMAGES = {
  sun: '../../../../../assets/sun.jpg',
  cold: '../../../../../assets/cold1.jpg',
  snow: '../../../../../assets/cold2.jpg',
  rain: '../../../../../assets/raining.jpg',
} as const;

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
  readonly feelsLikeIcon = faTemperatureHalf;
  readonly conditionIcon = faCloud;
  readonly sunriseIcon = faSun;
  readonly sunsetIcon = faMoon;

  formatLocalTime(timestamp: number): string {
    const localDate = new Date((timestamp + this.weatherData.timezone) * 1000);
    const hours = String(localDate.getUTCHours()).padStart(2, '0');
    const minutes = String(localDate.getUTCMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  get heroImage(): string {
    if (!this.weatherData?.weather || !this.weatherData?.main) {
      return HERO_IMAGES.sun;
    }

    const condition = getConditionGroup(
      this.weatherData.weather[0]?.main ?? ''
    );

    if (condition === 'rain') {
      return HERO_IMAGES.rain;
    }
    if (condition === 'snow') {
      return HERO_IMAGES.snow;
    }
    return getTemperatureBand(this.weatherData.main.temp) === 'cold'
      ? HERO_IMAGES.cold
      : HERO_IMAGES.sun;
  }
}
