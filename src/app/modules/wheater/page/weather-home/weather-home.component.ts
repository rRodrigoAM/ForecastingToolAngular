import { WeatherService } from './../../services/weather.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
export class WeatherHomeComponent implements OnInit{
  initialCityName = 'Blumenau'

  constructor(private WeatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
this.WeatherService.getWeatherDatas(cityName)
.subscribe({
  next: (response) => {
    console.log(response);
  },
  error: (error) => console.log(error),
});
  }
}
