import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy
} from '@angular/core';
import { forkJoin, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil } from 'rxjs/operators';
import { WeatherData } from '../../../../models/interfaces/weather-data.interface';
import { WikipediaArticle } from '../../../../models/interfaces/wikipedia-article.interface';
import { WikipediaService } from '../../services/wikipedia.service';

@Component({
  selector: 'app-city-info-card',
  templateUrl: './city-info-card.component.html',
  styleUrls: ['./city-info-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityInfoCardComponent implements OnChanges, OnDestroy {
  @Input() weatherData!: WeatherData;

  citySummary: WikipediaArticle | null = null;
  nearbyArticles: WikipediaArticle[] = [];
  isLoading = true;
  hasError = false;

  private readonly weatherData$ = new ReplaySubject<WeatherData>(1);
  private readonly destroy$ = new Subject<void>();

  constructor(
    private wikipediaService: WikipediaService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.weatherData$
      .pipe(
        switchMap(weather => {
          this.isLoading = true;
          this.hasError = false;
          this.changeDetectorRef.markForCheck();

          return forkJoin({
            summary: this.wikipediaService.getCitySummary(weather.name),
            nearbyArticles: this.wikipediaService.getNearbyArticles(
              weather.coord.lat,
              weather.coord.lon
            )
          }).pipe(
            catchError(() => of({
              summary: null,
              nearbyArticles: [],
              hasError: true
            }))
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(result => {
        this.citySummary = result.summary;
        this.nearbyArticles = result.nearbyArticles;
        this.hasError = 'hasError' in result && result.hasError;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnChanges(): void {
    if (this.weatherData) {
      this.weatherData$.next(this.weatherData);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.weatherData$.complete();
  }
}
