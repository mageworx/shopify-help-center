import { initializeSearch } from 'components/search';
import { initializeLightense } from 'components/lightense';

function init() {
  const main = document.querySelector('main.content');

  initializeSearch();

  if (main?.classList.contains('article')) {
    initializeLightense();
  }
}

init();
