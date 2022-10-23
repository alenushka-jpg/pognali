// Скрипт счетчика с ползунком
const depth = document.querySelector(".value-level__depth");
const line = document.querySelector(".value-level__line");
const levelPins = document.querySelectorAll(".value-level__pin");
const levelValues = document.querySelectorAll(".value-level__value")
const levelPinFirst = document.querySelector(".value-level__pin--first");
const valuePinFirst = document.querySelector(".value-level__value--first");
const labelPinFirst = document.querySelector(".value-level__label--first");
const levelPinSecond = document.querySelector(".value-level__pin--second");
const valuePinSecond = document.querySelector(".value-level__value--second");
const labelPinSecond = document.querySelector(".value-level__label--second");
const maxValue = firstPin.value.getAttribute("data-max");
const mx = 0;
const MIN = 0;
const currentDevice = null;
let MAX = line.offsetWidth - firstPin.pin.offsetWidth;

const firstPin = {
  pin: levelPinFirst,
  value: valuePinFirst,
  label: labelPinFirst,
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
    return x;
  }
}

const secondPin = {
  pin: levelPinSecond,
  value: valuePinSecond,
  label: labelPinSecond,
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
    return x;
  }
}

const toValue = function (pin) {
  if (pin.classList.contains("value-level__pin--first")) {
    return firstPin.value;
  }

  else {
    return secondPin.value;
  }
}

const sliderHandler = function (evt) {
  evt.preventDefault();

  const mouseMoveHandler = function (em) {
    em.preventDefault();

    if (evt.target.classList.contains("value-level__pin--first")) {
      let x = firstPin.pin.offsetLeft + em.movementX;
      x = firstPin.getX(x);
      firstPin.value.value = Math.floor(x / MAX * maxValue);
    }

    else {
      let x = secondPin.pin.offsetLeft + em.movementX;
      x = secondPin.getX(x, em.movementX);
      secondPin.value.value = Math.floor(x / MAX * maxValue);
    }
  }

  const mouseUpHandler = function (eu) {
    eu.preventDefault();
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  }

  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
}

const mobileSliderHandler = function (evt) {
  evt.preventDefault();

  let touchStart = evt.changedTouches[0].pageX;

  const touchMoveHandler = function (tm) {
    const touchCurrent = tm.changedTouches[0].pageX - touchStart;
    if (evt.target.classList.contains("value-level__pin--first")) {
      let x = firstPin.pin.offsetLeft + touchCurrent;
      x = firstPin.getX(x);
      firstPin.value.value = Math.floor(x / MAX * maxValue);
    }
    else {
      let x = secondPin.pin.offsetLeft + touchCurrent;
      x = secondPin.getX(x, touchCurrent);
      secondPin.value.value = Math.floor(x / MAX * maxValue);
    }

    touchStart = tm.changedTouches[0].pageX;
  }

  const touchEndHandler = function (te) {
    te.preventDefault();

    document.removeEventListener("touchmove", touchMoveHandler);
    document.removeEventListener("touchend", touchEndHandler);
  }

  document.addEventListener("touchmove", touchMoveHandler);
  document.addEventListener("touchend", touchEndHandler);
}

const numberChange = function (index) {
  if (index === 0) {
    let x = firstPin.value.value * MAX / maxValue;
    x = firstPin.getX(x);

    if (x < (firstPin.value.value * MAX / maxValue)) {
      firstPin.value.value = secondPin.value.value;
    }
  }

  else {
    let x = secondPin.value.value * MAX / maxValue;
    x = secondPin.getX(x);

    if (x > (secondPin.value.value * MAX / maxValue)) {
      secondPin.value.value = firstPin.value.value;
    }
  }
};

const initSlider = function () {
  MAX = line.offsetWidth - firstPin.pin.offsetWidth;
  firstPin.getX(firstPin.value.value * MAX / maxValue);
  secondPin.getX(secondPin.value.value * MAX / maxValue);
}

levelValues.forEach(function (value, index) {
  value.addEventListener("change", function () {
    numberChange(index);
  });
});

levelPins.forEach(function (pin, index) {
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

// matchMedia API
const getCurrentDevice = function () {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return "mobile";
  }

  else if (window.matchMedia("(min-width: 1440px)").matches) {
    return "desktop";
  }

  return "tablet";
}


window.addEventListener("resize", function () {
  if (currentDevice !== getCurrentDevice()) {
    const currentFilterItem = line.closest(".accordion-filter__fieldset");
    if (!currentFilterItem.classList.contains("accordion-filter__fieldset--open")) {
      currentFilterItem.classList.toggle("accordion-filter__fieldset--open");
      initSlider();
      currentFilterItem.classList.toggle("accordion-filter__fieldset--open");
    }
    else {
      initSlider();
    }
  }
})

initSlider();
