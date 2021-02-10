export interface Document {
  id: number;
  url: string;
  title: string;
  parent: string;
  body: string;
  excerpt: string;
}

export type SearchDocumentMap = Map<number, Document>;
