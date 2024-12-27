// 데이터 가져오기
let data = [];

async function fetchData() {
  const response = await fetch('/posts.json');
  data = await response.json();
  console.log(data);

  renderPage('/');
}

function renderPage(route) {
  const app = document.getElementById('app');
  let filteredData;

  if (route === '/') {
    filteredData = data;
  } else {
    filteredData = data.filter(
      (item) => item.category === route.replace('/', '')
    );
  }

  app.innerHTML = `
    <ul>
      ${filteredData.map((item) => `<li>${item.title}</li>`).join('')}
    </ul>
  `;
}

function navigate(url) {
  history.pushState(null, null, url);
  renderPage(url);
}

document.addEventListener('click', (e) => {
  if (e.target.matches('[data-link]')) {
    e.preventDefault();
    navigate(e.target.getAttribute('href'));
  }
});

fetchData();
