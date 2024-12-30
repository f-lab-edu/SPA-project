export function setNavEvent() {
  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hasAttribute('data-link')) {
      e.preventDefault();
      const url = e.target.getAttribute('href');
      navigate(url);
    }
  });

  function navigate(url) {
    history.pushState(null, null, url);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
}
