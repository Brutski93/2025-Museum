const burger = document.querySelector('.burger');
const burgerMenu = document.querySelector('.burger-menu');
const item1 = document.querySelector('.item1');
const item2 = document.querySelector('.item2');
const item3 = document.querySelector('.item3');
const welcomeText = document.querySelector('.welcome-content-text');
const body = document.querySelector('body');
const ul = document.querySelector('.navig');

function openBurger(event) {
  item1.classList.add('item-r1');
  item3.classList.add('item-r3');
  item2.classList.add('hidden');
  welcomeText.classList.add('over-left');
  burgerMenu.classList.add('zero-left');
  body.classList.add('body-fix');
  document.addEventListener('mousedown', checkAndClose);
}
function closeBurger(event) {
  document.removeEventListener('mousedown', checkAndClose);
  item1.classList.remove('item-r1');
  item3.classList.remove('item-r3');
  item2.classList.remove('hidden');
  welcomeText.classList.remove('over-left');
  burgerMenu.classList.remove('zero-left');
  body.classList.remove('body-fix');
}
function checkAndClose(event) {
  if (burgerMenu.classList.contains('zero-left')) {
    if ((!burgerMenu.contains(event.target)) && (!burger.contains(event.target))) closeBurger();
  }
}
function checkBurger(event) {
  if (burgerMenu.classList.contains('zero-left')) closeBurger();
  else openBurger();
}
burger.addEventListener('mouseup', checkBurger);
ul.addEventListener('click', closeBurger);
window.addEventListener('resize', () => {
  if (body.classList.contains('body-fix')) closeBurger();
});