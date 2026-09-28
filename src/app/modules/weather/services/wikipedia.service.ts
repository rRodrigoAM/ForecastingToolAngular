import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { WikipediaArticle } from '../../../models/interfaces/wikipedia-article.interface';

interface WikipediaApiPage {
  pageid: number;
  title: string;
  index?: number;
  extract?: string;
  fullurl?: string;
  thumbnail?: {
    source: string;
  };
  coordinates?: Array<{
    lat: number;
    lon: number;
  }>;
}

interface WikipediaApiResponse {
  query?: {
    pages?: Record<string, WikipediaApiPage>;
  };
}

@Injectable()
export class WikipediaService {
  private readonly apiUrl = 'https://pt.wikipedia.org/w/api.php';
  private readonly headers = new HttpHeaders({
    'Api-User-Agent': 'ForecastingToolAngular/1.0 (https://github.com/rRodrigoAM/ForecastingToolAngular)'
  });

  constructor(private http: HttpClient) {}

  getCitySummary(cityName: string): Observable<WikipediaArticle | null> {
    const search = cityName.trim();

    if (!search) {
      return of(null);
    }

    return this.http.get<WikipediaApiResponse>(this.apiUrl, {
      headers: this.headers,
      params: {
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'search',
        gsrsearch: search,
        gsrnamespace: 0,
        gsrlimit: 1,
        prop: 'extracts|pageimages|info',
        exintro: 1,
        explaintext: 1,
        piprop: 'thumbnail',
        pithumbsize: 600,
        inprop: 'url'
      }
    }).pipe(
      map(response => this.mapPages(response)[0] ?? null)
    );
  }

  getNearbyArticles(latitude: number, longitude: number): Observable<WikipediaArticle[]> {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return of([]);
    }

    return this.http.get<WikipediaApiResponse>(this.apiUrl, {
      headers: this.headers,
      params: {
        action: 'query',
        format: 'json',
        origin: '*',
        generator: 'geosearch',
        ggscoord: `${latitude}|${longitude}`,
        ggsradius: 10000,
        ggslimit: 8,
        ggsnamespace: 0,
        prop: 'extracts|pageimages|info|coordinates',
        exintro: 1,
        explaintext: 1,
        piprop: 'thumbnail',
        pithumbsize: 400,
        inprop: 'url'
      }
    }).pipe(
      map(response => this.mapPages(response))
    );
  }

  private mapPages(response: WikipediaApiResponse): WikipediaArticle[] {
    return Object.values(response.query?.pages ?? {})
      .sort((first, second) => (first.index ?? 0) - (second.index ?? 0))
      .map(page => {
        const coordinates = page.coordinates?.[0];

        return {
          pageId: page.pageid,
          title: page.title,
          extract: page.extract ?? '',
          articleUrl: page.fullurl ?? this.getArticleUrl(page.title),
          thumbnailUrl: page.thumbnail?.source,
          coordinates: coordinates
            ? { latitude: coordinates.lat, longitude: coordinates.lon }
            : undefined
        };
      });
  }

  private getArticleUrl(title: string): string {
    return `https://pt.wikipedia.org/wiki/${encodeURIComponent(title.replace(/ /g, '_'))}`;
  }
}
