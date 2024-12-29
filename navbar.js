export function setNavEvent() {
  const navbar = document.getElementById('navbar');

  navbar.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hasAttribute('data-link')) {
      console.log('이벤ㄴ트되네?');
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
