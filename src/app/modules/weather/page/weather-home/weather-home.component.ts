import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, HostBinding } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { WeatherService } from '../../services/weather.service';
import { WeatherData } from '../../../../models/interfaces/weather-data.interface';
import { APP_CONSTANTS } from '../../../../core/constants/app.constants';
import { getThemeName } from '../../../../core/utils/weather-theme.util';

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
  currentTheme = '';

  constructor(
    private weatherService: WeatherService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  @HostBinding('attr.data-theme')
  get dataTheme(): string {
    return this.currentTheme;
  }

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
          this.currentTheme = getThemeName(
            response.main.temp,
            response.weather?.[0]?.main ?? ''
          );
          this.changeDetectorRef.detectChanges();
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
