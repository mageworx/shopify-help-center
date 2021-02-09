import { Document, SearchDocumentMap } from 'types/search';

export function setupDocumentsMapping(docs: Document[]): SearchDocumentMap {
  const documents: SearchDocumentMap = new Map();

  docs.forEach(({ id, url, title, body }) => {
    documents.set(id, {
      url,
      title,
      body,
    });
  });

  return documents;
}
