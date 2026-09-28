import { APP_CONSTANTS } from '../constants/app.constants';

/**
 * Mapeia temperatura e condição climática para o tema visual da página.
 * Os nomes retornados casam com os seletores [data-theme='...'] definidos
 * no weather-home.component.scss, então qualquer nome novo aqui precisa
 * existir lá também.
 */
export type TemperatureBand = 'hot' | 'mild' | 'cold';
export type ConditionGroup = 'clear' | 'clouds' | 'rain' | 'snow';

export function getTemperatureBand(temp: number): TemperatureBand {
  if (temp > APP_CONSTANTS.WEATHER.TEMPERATURE_HOT_THRESHOLD) {
    return 'hot';
  }
  if (temp > APP_CONSTANTS.WEATHER.TEMPERATURE_THRESHOLD) {
    return 'mild';
  }
  return 'cold';
}

export function getConditionGroup(conditionMain: string): ConditionGroup {
  const condition = (conditionMain || '').toLowerCase();

  if (
    condition.includes('rain') ||
    condition.includes('drizzle') ||
    condition.includes('thunder')
  ) {
    return 'rain';
  }
  if (condition.includes('snow') || condition.includes('sleet')) {
    return 'snow';
  }
  if (
    condition.includes('cloud') ||
    condition.includes('mist') ||
    condition.includes('fog') ||
    condition.includes('haze') ||
    condition.includes('smoke') ||
    condition.includes('dust')
  ) {
    return 'clouds';
  }
  return 'clear';
}

export function getThemeName(temp: number, conditionMain: string): string {
  const condition = getConditionGroup(conditionMain);

  // chuva e neve têm visual próprio, independente da faixa de temperatura
  if (condition === 'rain' || condition === 'snow') {
    return condition;
  }
  return `${getTemperatureBand(temp)}-${condition}`;
}
