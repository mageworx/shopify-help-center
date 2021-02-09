export function setupSearchHighlighter(query: string) {
  query = query.replace(/[\s*+\-:~^]+/g, ' ').trim();

  return function (content: string) {
    const regex = new RegExp(`(${query})`, 'gim');

    return content.replace(regex, '<mark>$1</mark>');
  };
}
