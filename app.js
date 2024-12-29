// 데이터 가져오기
let data = [];

async function fetchData() {
  const response = await fetch('/posts.json');
  data = await response.json();
  renderPage('/');
}

function renderPage(route) {
  const app = document.getElementById('app');
  let filteredData;
  // 라우트가 메인페이지일떄
  if (route === '/') {
    filteredData = data;
    app.innerHTML = `
    <ul>
      ${filteredData.map((item) => `<li><a href="/detail/${item.id}" data-link>${item.title}</a></li>`).join('')}
    </ul>
  `;
    // 라우트가 detail일떄
  } else if (route.startsWith('/detail')) {
    const id = route.split('/')[2];
    const item = data.find((item) => item.id == id);
    // 라우트가 detail 일치하는 id 가있을떄
    if (item) {
      app.innerHTML = `        
        <h3>${item.title}</h3>
        <h3>${item.content}</h3>
        `;
    }
    // 라우트가 develop, design일때
  } else {
    filteredData = data.filter(
      (item) => item.category === route.replace('/', '')
    );
    app.innerHTML = `
    <ul>
      ${filteredData.map((item) => `<li><a href="/detail/${item.id}" data-link>${item.title}</a></li>`).join('')}
    </ul>
  `;
  }
}

function navigate(url, state = {}) {
  history.pushState(state, null, url);
  renderPage(url);
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    const url = e.target.getAttribute('href');
    console.log('url', url);
    const state = { id: url.split('/')[2] };
    navigate(url, state);
  }
});

window.addEventListener('popstate', (e) => {
  console.log('e', e);
  if (e.state) {
    console.log('e.state', e.state);
    renderPage(location.pathname);
  }
});

fetchData();
