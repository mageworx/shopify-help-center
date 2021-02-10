import { Document, SearchDocumentMap } from 'types/search';

export function setupDocumentsMapping(docs: Document[]): SearchDocumentMap {
  const documents: SearchDocumentMap = new Map();

  docs.forEach(({ id, ...rest }) => {
    documents.set(id, {
      id,
      ...rest,
    });
  });

  return documents;
}
