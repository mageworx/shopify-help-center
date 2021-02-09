import { fromEvent, merge } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  debounceTime,
  filter,
  scan,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import Search from './components/Search';
import { Document } from 'types/search';
import { renderSearchResults } from './components/SearchResults';

interface State {
  active: boolean;
  value: string;
}

export function initializeSearch() {
  const container = document.querySelector('[data-search-wrapper]');
  const field = document.querySelector<HTMLInputElement>(
    '[data-search-field]'
  )!;
  const searchResults = document.querySelector('[data-search-results]')!;
  const overlay = document.querySelector('[data-search-overlay]')!;
  const clearButton = document.querySelector('[data-search-clear]')!;
  const searchActiveClassName = 'search--active';

  if (!container) {
    return;
  }

  function toggleActive(active: boolean) {
    if (active) {
      container!.classList.add(searchActiveClassName);
    } else {
      container!.classList.remove(searchActiveClassName);

      field.blur();
    }
  }

  function clear() {
    field.value = '';
  }

  let index: Search;

  function search(value: string) {
    if (value === '') {
      clear();
    }

    const results = index.search(value);

    renderSearchResults(results, value, searchResults as HTMLDivElement);
  }

  ajax
    .getJSON('/assets/search_index.json')
    .pipe(map((docs) => new Search(docs as Document[])))
    .subscribe((idx) => {
      index = idx;
    });

  const focus$ = fromEvent(field, 'focus').pipe(
    map(() => (state: State) => ({ ...state, active: true }))
  );

  const overlay$ = fromEvent(overlay, 'click').pipe(
    map(() => (state: State) => ({ ...state, active: false }))
  );

  const keyboard$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    filter((evt) => !(evt.metaKey || evt.ctrlKey)),
    filter((evt) => evt.key === 'Escape'),
    map(() => (state: State) => ({ ...state, active: false }))
  );

  const input$ = fromEvent<KeyboardEvent>(field, 'input').pipe(
    debounceTime(300),
    map((e) => (e.target as HTMLInputElement).value.toLowerCase().trim()),
    distinctUntilChanged(),
    map((value: string) => (state: State) => ({ ...state, value }))
  );

  const clear$ = fromEvent(clearButton, 'click').pipe(
    map(() => (state: State) => ({ ...state, value: '' }))
  );

  const search$ = merge(focus$, overlay$, keyboard$, input$, clear$).pipe(
    scan((state: State, fn) => fn(state), {
      active: false,
      value: '',
    })
  );

  search$.subscribe(({ active, value }: State) => {
    toggleActive(active);
    search(value);
  });
}
