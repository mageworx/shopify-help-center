import { fromEvent } from 'rxjs';

export function initializeEmbedded() {
  fromEvent(document, 'DOMContentLoaded').subscribe(() => {
    const params = new URLSearchParams(window.location.search);
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');

    if (params.get('embedded') === null && header && footer) {
      header.classList.remove('header--hidden');
      footer.classList.remove('footer--hidden');
    }
  });
}
