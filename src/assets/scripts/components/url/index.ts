import { fromEvent } from 'rxjs';

export function initializeEmbedded() {
  fromEvent(window, 'load').subscribe(() => {
    const params = new URLSearchParams(window.location.search);
    const header = document.querySelector('.header');

    if (params.get('embedded') === null && header) {
      header.classList.remove('header--hidden');
    }
  });
}
