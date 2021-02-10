import { render } from 'preact';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import { Document } from 'types/search';
import { pluralize } from 'utilities/pluralize';
import { throttle } from 'throttle-debounce';

interface SearchResultsProps {
  items: Document[];
  query: string;
}

function SearchResults({ items, query }: SearchResultsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [itemsToShow, setItemsToShow] = useState(3);
  const visibleItems = items.slice(0, itemsToShow);

  const onScrolledToBottom = useCallback(() => {
    const nextVisibleIndex = itemsToShow + 3;

    setItemsToShow(nextVisibleIndex);
  }, [itemsToShow, items.length]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }

    const offsetHeight = scrollRef.current.offsetHeight;
    const scrollHeight = scrollRef.current.scrollHeight;
    const handleScroll = throttle(300, function (e) {
      const scrollTop = (e.target as HTMLDivElement).scrollTop;

      if (offsetHeight + scrollTop === scrollHeight) {
        onScrolledToBottom();
      }
    });

    scrollRef.current!.addEventListener('scroll', handleScroll);

    return () => {
      scrollRef.current!.removeEventListener('scroll', handleScroll);
    };
  }, [onScrolledToBottom, scrollRef.current]);

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
      {visibleItems.map(({ id, url, title, parent, excerpt }) => {
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
    <div class="search-results__scrollwrap" ref={scrollRef}>
      <div class="search-results__output">
        {metaMarkup}
        {listMarkup}
      </div>
    </div>
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
