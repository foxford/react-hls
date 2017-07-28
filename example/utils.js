export function parseQueryString () {
  const search = window.location.search

  return search.substr(1).split('&').reduce((acc, el) => {
    const ar = el.split('=')

    acc[ar[0]] = ar[1] || true
    return acc
  }, {})
}
