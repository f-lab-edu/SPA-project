import { setupRouter } from './router.js';
import { setNavEvent } from './navbar.js';

// 초기화함수
async function initApp() {
  try {
    setNavEvent();
    setupRouter();
  } catch (error) {
    console.error('초기화 에러', error);
  }
}

initApp();
