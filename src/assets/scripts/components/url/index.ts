export function initializeEmbedded() {
  const isEmbedded = window.top !== window.self;
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');

  if (!isEmbedded && header && footer) {
    header.classList.remove('header--hidden');
    footer.classList.remove('footer--hidden');
  }
}
