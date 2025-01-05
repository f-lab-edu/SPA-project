export function setNavEvent() {
  const navbar = document.querySelector('#navbar');

  navbar.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
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
