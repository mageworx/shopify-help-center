export interface Document {
  id: number;
  url: string;
  title: string;
  body: string;
  excerpt: string;
}

export interface SearchDocument {
  url: string;
  title: string;
  body: string;
}

export type SearchDocumentMap = Map<number, SearchDocument>;
