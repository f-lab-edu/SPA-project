import {
  fetchCategoryData,
  fetchDetailData,
  fetchAllData,
} from '../service/dataservice.js';

const routes = {
  '/': 'main',
  '/detail': 'detail',
  '/develop': 'category',
  '/design': 'category',
};
// main
async function renderMainPage() {
  const data = await fetchAllData();
  return `
   <ul>
      ${data.map((item) => `<li><a href="/detail?id=${item.id}" class="router-link">${item.title}</a></li>`).join('')}
   </ul>
      `;
}
// category
async function renderCategoryPage(category) {
  const data = await fetchCategoryData(category);
  console.log(data);
  return `
      <ul>
        ${data.map((item) => `<li><a href="/detail?id=${item.id}" class="router-link">${item.title}</a></li>`).join('')}
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

// nav
export function renderNav() {
  const nav = document.createElement('nav');
  nav.id = 'navbar';
  nav.innerHTML = `
  <a href="/" class="nav-link">전체</a>
  <a href="/develop" class="nav-link">개발</a>
  <a href="/design" class="nav-link">디자인</a>
  `;

  return nav;
}

// 렌더링
async function renderPage(route) {
  const content = document.getElementById('content');

  switch (routes[route]) {
    case 'main':
      content.innerHTML = await renderMainPage();
      break;
    case 'detail':
      content.innerHTML = await renderDetailPage();
      break;
    case 'category':
      const category = route.replace('/', '');
      content.innerHTML = await renderCategoryPage(category);
      break;
  }
}

export function setupRouter() {
  renderPage(location.pathname);

  window.addEventListener('popstate', () => {
    renderPage(location.pathname);
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('router-link')) {
      e.preventDefault();
      const url = e.target.getAttribute('href');
      history.pushState(null, null, url);
      renderPage(new URL(url, location.origin).pathname);
    }
  });
}
