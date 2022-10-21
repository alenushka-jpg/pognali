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
const letterTabs = document.querySelectorAll('.country-toggle__label');
const contents = document.querySelectorAll('.country-toggle__contries-list');

//открытие хедера
function bodyHiddenToggle() {
  if (body !== 'body') {
    body.classList.toggle('page__body--hidden');
  };
};

function showHeader() {
  header.classList.toggle('page-header--open');
};

function onHeaderClick() {
  showHeader();
  bodyHiddenToggle();
};

burger.addEventListener('click', onHeaderClick);

//открытие модального окна Бизнес-тарифы

function showModal() {
  modalWindow.classList.add('modal-window--open');
};

function hiddenModal() {
  modalWindow.classList.remove('modal-window--open');
};

function bodyHidden() {
  document.body.style.overflowY = 'scroll';
  document.body.style.position = 'fixed';
}

function bodyVisible() {
  document.body.style.overflowY = 'scroll';
  document.body.style.position = 'inherit';
}

function onOpenClick() {
  showModal();
};

function onCloseClick() {
  hiddenModal();
};

if (modalWindowOpen) {
  modalWindowOpen.addEventListener('click', e => {
    e.preventDefault();
    onOpenClick();
  }
)};

if (modalWindowClose) {
  modalWindowClose.addEventListener('click', e => {
    e.preventDefault();
    onCloseClick();
  });
};

// Скрипт для закрытия блока modal-window при клике на клавишу esc

window.addEventListener('keydown', evt => {
  if (evt.keyCode === 27) {
    if (modalWindow.classList.contains('modal-window--open')) {
      evt.preventDefault();

      modalWindow.classList.remove('modal-window--open');
    };
  };
});

function showCountrySelect() {
  countryToggle.classList.add('country-toggle--open');
};

function hiddenCountrySelect() {
  countryToggle.classList.remove('country-toggle--open');
};

function showCountryBackground() {
  fieldsetChoose.classList.add('select-country__fieldset--open');
};

function hiddenCountryBackground() {
  fieldsetChoose.classList.remove('select-country__fieldset--open');
};

function onOpenSelectClick() {
  showCountrySelect();
  showCountryBackground();
};

function onCloseSelectClick() {
  hiddenCountrySelect();
  hiddenCountryBackground();
};

if (buttonCountry) {
  buttonCountry.addEventListener('click', () => {
    onOpenSelectClick();
  });
};

if (buttonCloseCountrySelect) {
  buttonCloseCountrySelect.addEventListener('click', () => {
    onCloseSelectClick();
  });
};

// открытие фильтрации на странице каталог

function showFilter() {
  filter.classList.toggle('filter--open');
};

function hiddenFilter() {
  filter.classList.remove('filter--open');
};

if(filterButtonToggle) {
  filterButtonToggle.addEventListener('click', showFilter);
};

if(filterButtonBig) {
  filterButtonBig.addEventListener('click', hiddenFilter);
};

// Скрипт для фиксированного меню

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
  });
});

// Закрытии блока modal-window при клике на overlay

if (overlay) {
  overlay.addEventListener('click', hiddenModal);
};

if (overlay) {
  overlay.addEventListener('click', bodyVisible);
};

// Скрипт вкладок переключения стран

// запускает цикл для каждой вкладки и добавляет на неё событие
for (let i = 0; i < letterTabs.length; i++) {
  letterTabs[i].addEventListener('click', () => {
    // удаляет активный класс с вкладок
    for (let i = 0; i < letterTabs.length; i++) {
      letterTabs[i].classList.remove('country-toggle__label--selected');
    };
    // добавляет активный класс
    letterTabs[i].classList.add('country-toggle__label--selected');
    // удаляет активный класс с блоков содержимого вкладок
    for (let i = 0; i < contents.length; i++) {
      contents[i].classList.remove('country-toggle__contries-list--selected');
    };
    // добавляет активный класс
    contents[i].classList.add('country-toggle__contries-list--selected');
  });
};


var depth = document.querySelector(".value-level__depth");
var line = document.querySelector(".value-level__line");

var firstPin = {
  pin: document.querySelector(".value-level__pin--first"),
  value: document.querySelector(".value-level__value--first"),
  label: document.querySelector(".value-level__label--first"),
  getX: function (x) {
          if (x < MIN) {
            x = MIN;
          }
          if (x > MAX) {
            x = MAX;
          }
          if (x > secondPin.pin.offsetLeft) {
            x = secondPin.pin.offsetLeft;
          }
          this.pin.style.left = x + "px";
          depth.style.left = x + "px";
          return x; }
}

var mx = 0;
var secondPin = {
  pin: document.querySelector(".value-level__pin--second"),
  value: document.querySelector(".value-level__value--second"),
  label: document.querySelector(".value-level__label--second"),
  getX: function (x, mx) {
          if (x < MIN) {
            x = MIN;
          }
          if (x > MAX) {
            x = MAX;
          }
          if (x < firstPin.pin.offsetLeft) {
            x = firstPin.pin.offsetLeft;
          }
          if (firstPin.pin.offsetLeft === secondPin.pin.offsetLeft && (secondPin.pin.offsetLeft - x) > -1 && mx != 0) {
            x = firstPin.pin.offsetLeft + mx;
            x = firstPin.getX(x);
            firstPin.value.value = Math.floor(x / MAX * maxValue);
          }
          this.pin.style.left = x + "px";
          depth.style.right = (MAX - x) + "px";
          return x; }
}

var MIN = 0;
var MAX = line.offsetWidth - firstPin.pin.offsetWidth;
var maxValue = firstPin.value.getAttribute("data-max");

var toValue = function (pin) {
  if (pin.classList.contains("value-level__pin--first")) {
    return firstPin.value;
  }
  else {
    return secondPin.value;
  }
}

var sliderHandler = function (evt) {
  evt.preventDefault();

  var mouseMoveHandler = function (em) {
    em.preventDefault();

    if (evt.target.classList.contains("value-level__pin--first")) {
      var x = firstPin.pin.offsetLeft + em.movementX;
      x = firstPin.getX(x);
      firstPin.value.value = Math.floor(x / MAX * maxValue);
    }
    else {
      var x = secondPin.pin.offsetLeft + em.movementX;
      x = secondPin.getX(x, em.movementX);
      secondPin.value.value = Math.floor(x / MAX * maxValue);
    }
  }

  var mouseUpHandler = function (eu) {
    eu.preventDefault();
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
}

var mobileSliderHandler = function (evt) {
  evt.preventDefault();

  var touchStart = evt.changedTouches[0].pageX;

  var touchMoveHandler = function (tm) {
    var touchCurrent = tm.changedTouches[0].pageX - touchStart;
    if (evt.target.classList.contains("value-level__pin--first")) {
      var x = firstPin.pin.offsetLeft + touchCurrent;
      x = firstPin.getX(x);
      firstPin.value.value = Math.floor(x / MAX * maxValue);
    }
    else {
      var x = secondPin.pin.offsetLeft + touchCurrent;
      x = secondPin.getX(x, touchCurrent);
      secondPin.value.value = Math.floor(x / MAX * maxValue);
    }

    touchStart = tm.changedTouches[0].pageX;
  }

  var touchEndHandler = function (te) {
    te.preventDefault();

    document.removeEventListener("touchmove", touchMoveHandler);
    document.removeEventListener("touchend", touchEndHandler);
  }

  document.addEventListener("touchmove", touchMoveHandler);
  document.addEventListener("touchend", touchEndHandler);
}

var numberChange = function (index) {
  if (index === 0) {
    var x = firstPin.value.value * MAX / maxValue;
    x = firstPin.getX(x);
    if (x < (firstPin.value.value * MAX / maxValue)) {
      firstPin.value.value = secondPin.value.value;
    }
  }
  else {
    var x = secondPin.value.value * MAX / maxValue;
    x = secondPin.getX(x);
    if (x > (secondPin.value.value * MAX / maxValue)) {
      secondPin.value.value = firstPin.value.value;
    }
  }
};

var initSlider = function () {
  MAX = line.offsetWidth - firstPin.pin.offsetWidth;
  firstPin.getX(firstPin.value.value * MAX / maxValue);
  secondPin.getX(secondPin.value.value * MAX / maxValue);
}

document.querySelectorAll(".value-level__value").forEach(function (value, index) {
  value.addEventListener("change", function () { numberChange(index); })
})

document.querySelectorAll(".value-level__pin").forEach(function (pin, index) {
  pin.addEventListener("mousedown", function (evt) { sliderHandler(evt); });
  pin.addEventListener("touchstart", function (evt) { mobileSliderHandler(evt);})
  pin.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 39 && toValue(pin).value < parseInt(maxValue)) {
      toValue(pin).value = parseInt(toValue(pin).value) + 1;
      numberChange(index);
    }
    if (evt.keyCode === 37 && toValue(pin).value > MIN) {
      toValue(pin).value = parseInt(toValue(pin).value) - 1;
      numberChange(index);
    }
  })
})

window.addEventListener("resize", function () {
  if (currentDevice !== getCurrentDevice()) {
    var currentFilterItem = line.closest(".filter__category");
    if (!currentFilterItem.classList.contains("filter__category--active")) {
      currentFilterItem.classList.toggle("filter__category--active");
      initSlider();
      currentFilterItem.classList.toggle("filter__category--active");
    }
    else {
      initSlider();
    }
  }
})

initSlider();
