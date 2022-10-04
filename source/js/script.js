const header = document.querySelector('.page-header');
const burger = document.querySelector('.page-header__burger');
const body = document.querySelector('.page__body');
const modalWindow = document.querySelector('.modal-window');
const modalWindowClose = document.querySelector('.modal-window__button');
const modalWindowOpen = document.querySelector('.add-profile__link');
const buttonCountry = document.getElementById('select-country');
const buttonCloseCountrySelect  = document.querySelector('.select-country__close--countries');
const fieldsetChoose = document.querySelector('.select-country__fieldset--choose');
const countryToggle = document.querySelector('.country-toggle');
const filter = document.querySelector('.filter');
const filterButtonToggle = document.querySelector('.filter__interactive-button');
const filterButtonBig = document.querySelector('.country-toggle__button');
const accordionToggle = document.querySelectorAll('.accordion-filter__toggle');
const overlay = document.querySelector('.overlay');

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
  // document.body.style.overflowY = 'scroll';
  document.body.style.overflow = 'hidden';
}

function bodyVisible() {
  document.body.style.overflowY = 'scroll';
}

function onOpenClick() {
  showModal();
  bodyHidden();
}

function onCloseClick() {
  hiddenModal();
  bodyVisible();
}

if (modalWindowOpen) {
  modalWindowOpen.addEventListener('click', onOpenClick);
}

if (modalWindowClose) {
  modalWindowClose.addEventListener('click', onCloseClick);
}

function showCountrySelect() {
  countryToggle.classList.add('country-toggle--open');
}

function hiddenCountrySelect() {
  countryToggle.classList.remove('country-toggle--open');
}

function showCountryBackground() {
  fieldsetChoose.classList.add('select-country__fieldset--open');
}

function hiddenCountryBackground() {
  fieldsetChoose.classList.remove('select-country__fieldset--open');
}

function onOpenSelectClick() {
  showCountrySelect();
  showCountryBackground();
}

function onCloseSelectClick() {
  hiddenCountrySelect();
  hiddenCountryBackground();
}

if(buttonCountry) {
  buttonCountry.addEventListener('click', () => {
    onOpenSelectClick();
  });
}

if(buttonCloseCountrySelect) {
  buttonCloseCountrySelect.addEventListener('click', () => {
    onCloseSelectClick();
  })
}

// открытие фильтрации на странице каталог

function showFilter() {
  filter.classList.toggle('filter--open');
}

function hiddenFilter() {
  filter.classList.remove('filter--open')
}

if(filterButtonToggle) {
  filterButtonToggle.addEventListener('click', showFilter);
}

if(filterButtonBig) {
  filterButtonBig.addEventListener('click', hiddenFilter);
}

// скрипт для фиксированного меню

window.addEventListener('scroll', e => {
  if(pageYOffset > 200) {
    header.classList.add('page-header--active');
  } else {
    header.classList.remove('page-header--active');
  };
});

// Аккордеон фильтр

accordionToggle.forEach(function (array) {
  array.addEventListener('click', function (item) {
    const parent = array.parentNode;

    parent.classList.toggle('accordion-filter__fieldset--open');
  })
})

// Закрытии блока modal-window при клике на overlay

if (overlay) {
  overlay.addEventListener('click', hiddenModal);
}
