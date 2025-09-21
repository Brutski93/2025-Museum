const input =document.querySelector('.explore-input');
const div = document.querySelector('.explore-content-img2');
const thumb = document.querySelector('.explore-content-img-thumb');

function resize(event) {
  div.style.width = 100 - input.value + '%';
  thumb.style.right = 100 - input.value + '%';
}
input.addEventListener("input", resize);