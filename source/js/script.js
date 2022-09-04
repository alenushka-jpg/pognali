const header = document.querySelector('.page-header');
const burger = document.querySelector('.page-header__burger');
const body = document.querySelector('.page__body');
const modalWindow = document.querySelector('.modal-window');
const modalWindowClose = document.querySelector('.modal-window__button');
const modalWindowOpen = document.querySelector('.add-profile__link');

//открытие хедера
function bodyHiddenToggle() {
  if (body !== 'body') {
    body.classList.toggle('page__body--hidden');
  }
}

function showHeader() {
  header.classList.toggle('page-header--open');
}

function onHeaderClick() {
  showHeader();
  bodyHiddenToggle();
}

burger.addEventListener('click', onHeaderClick);

//открытие модального окна Бизнес-тарифы
function showModal() {
  modalWindow.classList.add('modal-window--open');
}

function hiddenModal() {
  modalWindow.classList.remove('modal-window--open');
}

function bodyHidden() {
  body.classList.add('page__body--hidden');
}

function bodyShow() {
  body.classList.remove('page__body--hidden');
}

function onOpenClick() {
  showModal();
  bodyHidden();
}

function onCloseClick() {
  hiddenModal();
  bodyShow();
}

modalWindowOpen.addEventListener('click', onOpenClick);
modalWindowClose.addEventListener('click', onCloseClick);
