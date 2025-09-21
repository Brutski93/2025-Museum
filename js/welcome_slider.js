// get elements
const welcomeDiv = document.querySelector('.welcome-content-img');
const img1 = document.querySelector('.welcome-img-1');
const img2 = document.querySelector('.welcome-img-2');
const img3 = document.querySelector('.welcome-img-3');
const img4 = document.querySelector('.welcome-img-4');
const img5 = document.querySelector('.welcome-img-5');
const imgs = [img1, img2, img3, img4, img5];
const arrLeft = document.querySelector('.welcome-slider-left');
const arrRight = document.querySelector('.welcome-slider-right');
const indicatorsAll = document.querySelectorAll('.welcome-slider-indicators-size');
const textIndicator = document.querySelector('.corrent-page');
// calculate width
function calcWidth() {
  return welcomeDiv.offsetWidth;
}
// set indicators
let indicatorsData = [1];
function setindicators() {
  indicatorsData = [1];
  for (let i=0; i<5; i++) {
    indicatorsData[i+1] = indicatorsAll[i];
  }
}
setindicators();
function resetindicators() {
  for (let i=0; i<5; i++) {
    indicatorsAll[i].classList.remove('welcome-slider-indicators-avtive');
  }
  indicatorsAll[0].classList.add('welcome-slider-indicators-avtive');
}
// set positions
let width = calcWidth();
const positions = [];
function resetPositions() {
  width = calcWidth(); 
  for (let i=0; i<5; i++) {
    positions[i] = width * (i - 2) + 'px';
  }
}
resetPositions();
// base position
function setToBasePosition() {
  img1.style.left = positions[2];
  img2.style.left = positions[3];
  img3.style.left = positions[4];
  img4.style.left = positions[0];
  img5.style.left = positions[1];
}
setToBasePosition();
// text indicator
function rewriteTextIndicator() {
  textIndicator.innerHTML = '0' + indicatorsData[0];
}
// some shit for indicators
function makeActive(item) {
  item.classList.add('welcome-slider-indicators-avtive');
}
function makeInactive(item) {
  item.classList.remove('welcome-slider-indicators-avtive');
}
function moveActiveRight() {
  makeInactive(indicatorsData[indicatorsData[0]]);
  if (indicatorsData[0] !== 5) {
    makeActive(indicatorsData[indicatorsData[0] + 1]);
    indicatorsData[0]++;
  }
  else {
    makeActive(indicatorsData[1]);
    indicatorsData[0] = 1;
  }
}
function moveActiveLeft() {
  makeInactive(indicatorsData[indicatorsData[0]]);
  if (indicatorsData[0] !== 1) {
    makeActive(indicatorsData[indicatorsData[0] - 1]);
    indicatorsData[0]--;
  }
  else {
    makeActive(indicatorsData[5]);
    indicatorsData[0] = 5;
  }
}
// go right
function moveRight() {
  let width = calcWidth();
  for (let i = 0; i < 5; i++) {
    imgs[i].style.left = +imgs[i].style.left.slice(0, -2) + width + 'px';
    if (+imgs[i].style.left.slice(0, -2) > width*2) hideAndMoveToLeft(imgs[i], width);
  }
  moveActiveLeft();
  rewriteTextIndicator()
}
function hideAndMoveToLeft(img, width) {
  img.classList.add('hidden');
  img.style.left = width * -2 + 'px';
  setTimeout(() => img.classList.remove('hidden'), 501);
}
//go left
function moveLeft() {
  let width = calcWidth();
  for (let i = 0; i < 5; i++) {
    imgs[i].style.left = +imgs[i].style.left.slice(0, -2) - width + 'px';
    if (+imgs[i].style.left.slice(0, -2) < -width*2) hideAndMoveToRight(imgs[i], width);
  }
  moveActiveRight();
  rewriteTextIndicator();
}
function hideAndMoveToRight(img, width) {
  img.classList.add('hidden');
  img.style.left = width * 2 + 'px';
  setTimeout(() => img.classList.remove('hidden'), 501);
}
// pick needed indicator
function findShorterWayAndMoves(needToActivate) {
  let dif = needToActivate - indicatorsData[0];
  if (dif > 0) { 
    if (dif <= 2) { // then we need go right
      for (let i = 0; i < dif; i++) {
        moveLeft();
      }
    }
    else { // then we need go left
      for (let i = 0; i < 5 - dif; i++) {
        moveRight();
      }
    }
  }
  if (dif < 0) {
    dif = -dif;
    if (dif <= 2) { // then we need go left
      for (let i = 0; i < dif; i++) {
        moveRight();
      }
    }
    else { // then we need go right
      for (let i = 0; i < 5 - dif; i++) {
        moveLeft();
      }
    }
  }
  indicatorsData[0] = needToActivate;
}
function moveTo1() {
  findShorterWayAndMoves(1);
}
function moveTo2() {
  findShorterWayAndMoves(2);
}
function moveTo3() {
  findShorterWayAndMoves(3);
}
function moveTo4() {
  findShorterWayAndMoves(4);
}
function moveTo5() {
  findShorterWayAndMoves(5);
}
// resize functions
function resetAll() {
  reResetAll();
  setTimeout(reResetAll, 800);
}
function reResetAll() {
  moveTo1();
  setTimeout(resetPositions, 100);
  setTimeout(setToBasePosition, 200);
}
// events for arrows
arrRight.addEventListener('click', moveLeft);
arrLeft.addEventListener('click', moveRight);
// events for indicators
indicatorsData[1].addEventListener('click', moveTo1);
indicatorsData[2].addEventListener('click', moveTo2);
indicatorsData[3].addEventListener('click', moveTo3);
indicatorsData[4].addEventListener('click', moveTo4);
indicatorsData[5].addEventListener('click', moveTo5);
window.addEventListener('resize', resetAll);