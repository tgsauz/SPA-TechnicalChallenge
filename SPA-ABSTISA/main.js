import './style.css'
import { Router } from '/router.js'
import Nav from '/components/nav.js'
import { initializeColors, Colors } from './components/colors';

initializeColors();
Colors();

document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.getElementById('main-content');
  const navContainer = document.getElementById('navbar');
  
  navContainer.innerHTML = Nav();

  const router = new Router(mainContainer);
  router.init();
});
