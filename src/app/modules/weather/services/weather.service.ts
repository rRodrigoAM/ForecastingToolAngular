import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WeatherData } from '../../../models/interfaces/weather-data.interface';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly apiKey = APP_CONSTANTS.API.API_KEY;
  private readonly baseUrl = APP_CONSTANTS.API.WEATHER_BASE_URL;

  constructor(private http: HttpClient) {}

  getWeatherData(cityName: string): Observable<WeatherData> {
    const params = {
      q: cityName,
      units: 'metric',
      mode: 'json',
      appid: this.apiKey
    };

    return this.http.get<WeatherData>(this.baseUrl, { params })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
} 