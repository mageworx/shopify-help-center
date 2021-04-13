export function initializeEmbedded() {
  const className = 'embedded-hidden';
  const isEmbedded = window.top !== window.self;
  const hiddenElements = document.querySelectorAll('.' + className);

  if (!isEmbedded) {
    hiddenElements.forEach((el) => el.classList.remove(className));
  }
}
