import lunr from 'lunr';
import { Document, SearchDocumentMap } from 'types/search';
import { setupDocumentsMapping } from '../SearchDocument';

class Search {
  index: lunr.Index;
  documents: SearchDocumentMap;

  constructor(documents: Document[]) {
    this.documents = setupDocumentsMapping(documents);
    this.index = lunr(function () {
      this.ref('id');
      this.field('title', { boost: 1000 });
      this.field('body');
      this.metadataWhitelist = ['position'];

      this.pipeline.remove(lunr.stemmer);

      documents.forEach((doc) => {
        this.add(doc);
      });
    });
  }

  search(query: string): any {
    if (!query) {
      return [];
    }

    const groups = this.index.search(`${query}*`);

    return groups.reduce<Document[]>((results, { ref }) => {
      const document = this.documents.get(Number(ref));

      if (typeof document !== 'undefined') {
        results.push(document);
      }

      return results;
    }, []);
  }
}

export default Search;
