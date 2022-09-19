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


const buttonCountry = document.getElementById('select-country');
const buttonCloseCountrySelect  = document.querySelector('.select-country__close--countries');
const fieldsetChoose = document.querySelector('.select-country__fieldset--choose');
const countryToggle = document.querySelector('.country-toggle');

// function showCountrySelect() {
//   countryToggle.classList.add('country-toggle--open');
// }

// function hiddenCountrySelect() {
//   countryToggle.classList.remove('country-toggle--open');
// }

// function onOpenSelectClick() {
//   showCountrySelect();
// }

// function onCloseSelectClick() {
//   hiddenCountrySelect();
// }


function showCountrySelect() {
  fieldsetChoose.classList.add('select-country__fieldset--open');
}

function onOpenSelectClick() {
  showCountrySelect();
}

buttonCountry.addEventListener('click', () => {
  // onOpenSelectClick();
  console.log('hi')
})


// скрипт для фиксированного меню

window.addEventListener('scroll', e => {
  if(pageYOffset > 200) {
    header.classList.add('page-header--active');
  } else {
    header.classList.remove('page-header--active');
  };
});
