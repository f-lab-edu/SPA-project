import { setupRouter, renderNav } from './router/router.js';
import { setNavEvent } from './nav/setNavEvent.js';

// 초기화함수
async function initApp() {
  try {
    const header = document.getElementById('header');
    header.appendChild(renderNav());

    setNavEvent();
    setupRouter();
  } catch (error) {
    console.error('초기화 에러', error);
  }
}

initApp();
