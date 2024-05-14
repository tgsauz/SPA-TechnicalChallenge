import './style.css'
import { Router } from '/router.js'
import Nav from '/components/nav.js'
import { initializeColors, Colors } from './components/colors';

initializeColors();
Colors();

window.addEventListener('keypress', event => {
  if (event.key === ' ') {
    Colors();
  }
});

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

document.addEventListener('DOMContentLoaded', () => {
  const mainContainer = document.getElementById('main-content');
  const navContainer = document.getElementById('navbar');
  
  navContainer.innerHTML = Nav();


  const router = new Router(mainContainer);
  router.init();
});
