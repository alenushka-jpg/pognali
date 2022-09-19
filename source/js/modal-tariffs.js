//открытие модального окна Бизнес-тарифы
const modalWindow = document.querySelector('.modal-window');
const modalWindowClose = document.querySelector('.modal-window__button');
const modalWindowOpen = document.querySelector('.add-profile__link');

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
