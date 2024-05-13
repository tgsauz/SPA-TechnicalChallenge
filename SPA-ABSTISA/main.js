import './style.css'
import { Router } from '/router.js'
import Nav from '/components/nav.js'

document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.createElement('div');
  
  console.log(Nav());
  navContainer.id = 'navbar';
  navContainer.innerHTML = Nav();
  
  document.body.appendChild(navContainer);
  
  const appContainer = document.getElementById('app');
  console.log('appContainer', appContainer);

  const router = new Router(appContainer);
  router.init();
});
