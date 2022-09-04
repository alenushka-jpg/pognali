const header = document.querySelector('.page-header');
const burger = document.querySelector('.page-header__burger');
const body = document.querySelector('.page__body');

function bodyHidden() {
  if (body !== 'body') {
    body.classList.toggle('page__body--hidden');
  }
}

function showHeader() {
  header.classList.toggle('page-header--open');
}

function onOpenClick() {
  showHeader();
  bodyHidden();
}

burger.addEventListener('click', onOpenClick);
