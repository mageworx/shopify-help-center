import { render } from 'preact';
import { SearchDocument } from 'types/search';
import { pluralize } from 'utilities/pluralize';

interface SearchResultsProps {
  items: SearchDocument[];
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
      {items.map(({ url, title, body }) => {
        return (
          <li class="search-results__list-item search-results__result">
            <a href={url} class="search-results__result-link" tabIndex={-1}>
              <article class="search-results__result-article">
                <h1 class="search-results__result-title">
                  {highlight(title, query)}
                </h1>
                <p class="search-results__result-teaser">
                  {highlight(body, query)}
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
  results: SearchDocument[],
  query: string,
  container: HTMLElement
) {
  render(<SearchResults items={results} query={query} />, container);
}
