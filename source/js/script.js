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
  } );
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
}

function hiddenCountrySelect() {
  countryToggle.classList.remove('country-toggle--open');
}

function showCountryBackground() {
  fieldsetChoose.classList.add('select-country__fieldset--open');
}

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
}

function hiddenFilter() {
  filter.classList.remove('filter--open');
}

if(filterButtonToggle) {
  filterButtonToggle.addEventListener('click', showFilter);
}

if(filterButtonBig) {
  filterButtonBig.addEventListener('click', hiddenFilter);
}

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
  })
})

// Закрытии блока modal-window при клике на overlay

if (overlay) {
  overlay.addEventListener('click', hiddenModal);
}

if (overlay) {
  overlay.addEventListener('click', bodyVisible);
}

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


const Calendar = function(calendarTable) {

  //Сохраняем идентификатор div
  this.calendarTable = calendarTable;

  // Дни недели с понедельника
  this.DaysOfWeek = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Cб',
    'Вс'
  ];

  // Месяцы начиная с января
  this.Months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];

  //Устанавливаем текущий месяц, год
  const currentDate = new Date();

  this.currentMonth = currentDate.getMonth('9');
  this.currentYear = currentDate.getFullYear('22');
  this.currentDay = currentDate.getDate('3');
};

// Переход к следующему месяцу

Calendar.prototype.nextMonth = function() {
  if (this.currentMonth == 11) {
    this.currentMonth = 0;
    this.currentYear = this.currentYear + 1;
  } else {
    this.currentMonth = this.currentMonth + 1;
  }
  this.showCurrent();
};

// Переход к предыдущему месяцу
Calendar.prototype.previousMonth = function() {
  if ( this.currentMonth == 0 ) {
    this.currentMonth = 11;
    this.currentYear = this.currentYear - 1;
  }
  else {
    this.currentMonth = this.currentMonth - 1;
  }
  this.showCurrent();
};

// Показать текущий месяц
Calendar.prototype.showCurrent = function() {
  this.showMonth(this.currentYear, this.currentMonth);
};

Calendar.prototype.showMonth = function(y, m) {
  const currentDate = new Date(),
  // Первый день недели в выбранном месяце
  firstDayOfMonth = new Date(y, m, 7).getDay(),
  // Последний день выбранного месяца
  lastDateOfMonth =  new Date(y, m+1, 0).getDate(),
  // Последний день предыдущего месяца
  lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

  var table = '<table>';

  // Запись выбранного месяца и года
  table += '<thead><tr>';
  table += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
  table += '</tr></thead>';

  // заголовок дней недели
  table += '<tr class="days">';
  for (var i = 0; i < this.DaysOfWeek.length; i++) {
    table += '<td>' + this.DaysOfWeek[i] + '</td>';
  }
  table += '</tr>';

  //Записываем дни
  const im = 1;
  do {
    const dow = new Date(y, m, i).getDay();

    // Начать новую строку в понедельник
    if ( dow == 1 ) {
      table += '<tr>';
    }

    // Если первый день недели не понедельник показать последние дни придедущего месяца
    else if ( i == 1 ) {
      table += '<tr>';

      const k = lastDayOfLastMonth - firstDayOfMonth + 1;

      for (let j = 0; j < firstDayOfMonth; j++) {
        table += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }

    // Записываем текущий день в цикл
    const check = new Date();
    const checkYear = check.getFullYear();
    constcheckMonth = check.getMonth();
    if (checkYear == this.currentYear && checkMonth == this.currentMonth && i == this.currentDay) {
      table += '<td class="today">' + i + '</td>';
    } else {
      table += '<td class="normal">' + i + '</td>';
    };

    // закрыть строку в воскресенье
    if ( dow == 0 ) {
      table += '</tr>';
    } // Если последний день месяца не воскресенье, показать первые дни следующего месяца
    else if ( i == lastDateOfMonth ) {
      const k = 1;
      for (dow; dow < 7; dow++) {
        table += '<td class="not-current">' + k + '</td>';
        k++;
      }
    }
    i++;
  } while (i <= lastDateOfMonth);

  // Конец таблицы
  table += '</table>';

  // Записываем HTML в div
  document.getElementById(this.calendarTable).innerHTML = html;
};

// При загрузке окна
window.onload = function() {

  // Начать календарь
  const c = new Cal("calendarTable");
  c.showCurrent();

  // Привязываем кнопки «Следующий» и «Предыдущий»
  getId('btnNext').onclick = function() {
    c.nextMonth();
  };
  getId('btnPrev').onclick = function() {
    c.previousMonth();
  };
}
