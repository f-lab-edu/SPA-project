import {
  fetchCategoryData,
  fetchDetailData,
  fetchAllData,
} from '../service/dataservice.js';

const routes = {
  '/': renderMainPage,
  '/detail': renderDetailPage,
  '/develop': () => renderCategoryPage('develop'),
  '/design': () => renderCategoryPage('design'),
};
// main
async function renderMainPage() {
  const data = await fetchAllData();
  return `
   <ul>
      ${data.map((item) => `<li><a href="/detail?id=${item.id}" data-link>${item.title}</a></li>`).join('')}
   </ul>
      `;
}
// category
async function renderCategoryPage(category) {
  const data = await fetchCategoryData(category);
  console.log(data);
  return `
      <ul>
        ${data.map((item) => `<li><a href="/detail?id=${item.id}" data-link>${item.title}</a></li>`).join('')}
      </ul>
    `;
}
// detail
async function renderDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const item = await fetchDetailData(id);
  return `<h3>${item.title}</h3><p>${item.content}</p>`;
}
// 렌더링
async function renderPage(route) {
  const app = document.getElementById('app');
  const handler = routes[route];
  app.innerHTML = await handler();
}

export function setupRouter() {
  renderPage(location.pathname);

  window.addEventListener('popstate', () => {
    renderPage(location.pathname);
  });

  document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.hasAttribute('data-link')) {
      e.preventDefault();
      const url = e.target.getAttribute('href');
      history.pushState(null, null, url);
      renderPage(new URL(url, location.origin).pathname);
    }
  });
}
