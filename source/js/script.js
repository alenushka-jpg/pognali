const header = document.querySelector('.page-header');
const burger = document.querySelector('.page-header__burger');

function showHeader() {
  header.classList.toggle('page-header--open');
}

function onOpenClick() {
  showHeader();
}

burger.addEventListener('click', onOpenClick);
