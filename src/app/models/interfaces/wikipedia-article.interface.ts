export interface WikipediaArticle {
  pageId: number;
  title: string;
  extract: string;
  articleUrl: string;
  thumbnailUrl?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
