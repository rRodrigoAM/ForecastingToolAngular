export const APP_CONSTANTS = {
  API: {
    WEATHER_BASE_URL: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: 'b9e2b2dd8642f2231cd601b670b5d882'
  },
  WEATHER: {
    DEFAULT_CITY: 'São Paulo',
    TEMPERATURE_THRESHOLD: 15
  }
} as const; 