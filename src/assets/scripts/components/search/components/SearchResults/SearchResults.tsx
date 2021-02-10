import { render } from 'preact';
import { Document } from 'types/search';
import { pluralize } from 'utilities/pluralize';

interface SearchResultsProps {
  items: Document[];
  query: string;
}

function SearchResults({ items, query }: SearchResultsProps) {
  const metaContent =
    query.length === 0
      ? 'Type to start searching'
      : `${items.length} ${pluralize(
          items.length,
          'document',
          'documents'
        )} found`;
  const metaMarkup = <div class="search-results__meta">{metaContent}</div>;

  const listMarkup = (
    <ol class="search-results__list">
      {items.map(({ id, url, title, parent, excerpt }) => {
        return (
          <li class="search-results__list-item search-results__result" key={id}>
            <a href={url} class="search-results__result-link" tabIndex={-1}>
              <article class="search-results__result-article">
                <small class="search-results__parent">{parent}</small>
                <h1 class="search-results__result-title">
                  {highlight(title, query)}
                </h1>
                <p class="search-results__result-teaser">
                  {highlight(excerpt, query)}
                </p>
              </article>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {metaMarkup}
      {listMarkup}
    </>
  );
}

function highlight(content: string, query: string) {
  const terms = query.split(' ');
  const regex = new RegExp(terms.map((term) => `(${term})`).join('|'), 'gim');
  const tokens = content.split(regex).filter(Boolean);

  return tokens.map((token) =>
    terms.includes(token.toLowerCase()) ? <mark>{token}</mark> : <>{token}</>
  );
}

export function renderSearchResults(
  results: Document[],
  query: string,
  container: HTMLElement
) {
  render(<SearchResults items={results} query={query} />, container);
}
