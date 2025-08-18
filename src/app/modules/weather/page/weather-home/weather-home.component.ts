import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../../../models/interfaces/weather-data.interface';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: ['./weather-home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  
  initialCityName: string = APP_CONSTANTS.WEATHER.DEFAULT_CITY;
  weatherData!: WeatherData;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherData(this.initialCityName);
  }

  getWeatherData(cityName: string): void {
    this.weatherService
      .getWeatherData(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.weatherData = response;
        },
        error: (error) => console.error('Error fetching weather data:', error),
      });
  }

  onSubmit(): void {
    if (this.initialCityName.trim()) {
      this.getWeatherData(this.initialCityName);
      this.initialCityName = '';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 