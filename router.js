import {
  fetchCategoryData,
  fetchDetailData,
  fetchAllData,
} from './dataservice.js';

async function renderPage(route) {
  const app = document.getElementById('app');
  let content = '';

  if (route === '/') {
    // 전체 페이지
    const data = await fetchAllData(); // 전체 데이터 요청
    content = `
      <ul>
        ${data.map((item) => `<li><a href="/detail/${item.id}" data-link>${item.title}</a></li>`).join('')}
      </ul>
    `;
  } else if (route.startsWith('/develop') || route.startsWith('/design')) {
    // 카테고리 페이지
    const category = route.replace('/', '');
    const data = await fetchCategoryData(category);
    content = `
      <ul>
        ${data.map((item) => `<li><a href="/detail/${item.id}" data-link>${item.title}</a></li>`).join('')}
      </ul>
    `;
  } else if (route.startsWith('/detail/')) {
    // 상세 페이지
    const id = route.split('/')[2];
    console.log('id', id);
    const item = await fetchDetailData(id);
    content = `<h3>${item.title}</h3><p>${item.content}</p>`;
  }

  app.innerHTML = content;
}

export function setupRouter() {
  renderPage(location.pathname);

  window.addEventListener('popstate', () => {
    renderPage(location.pathname);
  });
}
