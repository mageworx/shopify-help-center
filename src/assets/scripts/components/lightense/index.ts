import Lightense from 'lightense-images';
import { fromEvent } from 'rxjs';

export function initializeLightense() {
  fromEvent(window, 'load').subscribe(() => {
    Lightense('img:not(.no-lightense)');
  });
}
