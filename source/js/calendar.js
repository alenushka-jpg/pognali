const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".calendar__list");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
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

  const calendarTitle = document.querySelector(".calendar__title");
  const calendarSubtitle = document.querySelector(".calendar__subtitle");

  if (calendarTitle) {
    calendarTitle.innerHTML = months[date.getMonth()];
  }

  if (calendarSubtitle) {
    calendarSubtitle.innerHTML = new Date().getFullYear();
  }

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days +=
    `<li class="calendar__item">
      <label class="calendar__label calendar__label--prev">
        <input class="calendar__input visually-hidden" type="radio" name="calendar__number">
        <span class="calendar__prev-date">${prevLastDay - x + 1}</span>
      </label>
    </li>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days +=
      `<li class="calendar__item">
        <label class="calendar__label calendar__label--current-today">
          <input class="calendar__input visually-hidden" type="checkbox" name="calendar__number">
          <span class="calendar__today">${i}</span>
        </label>
      </li>`;
    } else {
      days +=
      `<li class="calendar__item">
        <label class="calendar__label calendar__label--current-days">
          <input class="calendar__input visually-hidden" type="checkbox" name="calendar__number">
          <span class="calendar__days">${i}</span>
        </label>
      </li>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days +=
    `<li class="calendar__item">
      <label class="calendar__label calendar__label--next">
        <input class="calendar__input visually-hidden" type="checkbox" name="calendar__number">
        <span class="calendar__next-date">${j}</span>
      </label>
    </li>`;
    monthDays.innerHTML = days;
  }
};

const calendarPrev = document.querySelector(".prev");

if (calendarPrev) {
  calendarPrev.addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  });
}

const calendarNext = document.querySelector(".next");

if (calendarNext) {
  calendarNext.addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  });
}

renderCalendar();
