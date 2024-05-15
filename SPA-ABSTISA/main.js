import './index.html';
import './style.css';
import { Router } from '/router.js';
import Nav from '/components/nav.js';
import Info from '/components/info.js';
import NotFound from '/components/notfound.js';
import { initializeColors, Colors } from './components/colors';

window.addEventListener('keypress', event => {
  if (event.key === ' ') {
    Colors();
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.getElementById('main-content');
  const navContainer = document.getElementById('navbar');
  
  navContainer.innerHTML = Nav();

  // Inicializar los contenedores de las vistas  
  
  const infoContainer = document.createElement('div');
  infoContainer.id = 'info';
  infoContainer.innerHTML = Info();
  infoContainer.classList.add('hidden');
  
  const notFoundContainer = document.createElement('div');
  notFoundContainer.id = 'notfound';
  notFoundContainer.innerHTML = NotFound();
  notFoundContainer.classList.add('hidden');

  mainContainer.appendChild(infoContainer);
  mainContainer.appendChild(notFoundContainer);

  initializeColors();
  Colors();

  const colorBoxes = document.querySelectorAll('.color-box');
  const lockButtons = document.querySelectorAll('.lock-button');

  colorBoxes.forEach((colorBox, index) => {

    const toggleLock = () => {
      colorBox.classList.toggle('locked');
      lockButtons[index].blur();
    };
    lockButtons[index].addEventListener('click', () => {
      toggleLock();
      lockButtons[index].blur();
    });
    
});

  const router = new Router(mainContainer, infoContainer, notFoundContainer);
  router.init();
});
