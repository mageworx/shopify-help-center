import { initializeSearch } from 'components/search';
import { initializeLightense } from 'components/lightense';
import { initializeEmbedded } from 'components/url';

function init() {
  const main = document.querySelector('main.content');

  initializeEmbedded();
  initializeSearch();

  if (main?.classList.contains('article')) {
    initializeLightense();
  }
}

init();
