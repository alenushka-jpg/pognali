const depth=document.querySelector(".value-level__depth"),line=document.querySelector(".value-level__line"),levelPins=document.querySelectorAll(".value-level__pin"),levelValues=document.querySelectorAll(".value-level__value"),levelPinFirst=document.querySelector(".value-level__pin--first"),valuePinFirst=document.querySelector(".value-level__value--first"),labelPinFirst=document.querySelector(".value-level__label--first"),levelPinSecond=document.querySelector(".value-level__pin--second"),valuePinSecond=document.querySelector(".value-level__value--second"),labelPinSecond=document.querySelector(".value-level__label--second"),mx=0,MIN=0,currentDevice=null,firstPin={pin:levelPinFirst,value:valuePinFirst,label:labelPinFirst,getX:function(e){return e<0&&(e=0),e>MAX&&(e=MAX),e>secondPin.pin.offsetLeft&&(e=secondPin.pin.offsetLeft),this.pin.style.left=e+"px",depth.style.left=e+"px",e}},maxValue=firstPin.value.getAttribute("data-max");let MAX=line.offsetWidth-firstPin.pin.offsetWidth;const secondPin={pin:levelPinSecond,value:valuePinSecond,label:labelPinSecond,getX:function(e,t){return e<0&&(e=0),e>MAX&&(e=MAX),e<firstPin.pin.offsetLeft&&(e=firstPin.pin.offsetLeft),firstPin.pin.offsetLeft===secondPin.pin.offsetLeft&&secondPin.pin.offsetLeft-e>-1&&0!=t&&(e=firstPin.pin.offsetLeft+t,e=firstPin.getX(e),firstPin.value.value=Math.floor(e/MAX*maxValue)),this.pin.style.left=e+"px",depth.style.right=MAX-e+"px",e}},toValue=function(e){return e.classList.contains("value-level__pin--first")?firstPin.value:secondPin.value},sliderHandler=function(e){e.preventDefault();const t=function(t){if(t.preventDefault(),e.target.classList.contains("value-level__pin--first")){let e=firstPin.pin.offsetLeft+t.movementX;e=firstPin.getX(e),firstPin.value.value=Math.floor(e/MAX*maxValue)}else{let e=secondPin.pin.offsetLeft+t.movementX;e=secondPin.getX(e,t.movementX),secondPin.value.value=Math.floor(e/MAX*maxValue)}},n=function(e){e.preventDefault(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",n)};document.addEventListener("mousemove",t),document.addEventListener("mouseup",n)},mobileSliderHandler=function(e){e.preventDefault();let t=e.changedTouches[0].pageX;const n=function(n){const l=n.changedTouches[0].pageX-t;if(e.target.classList.contains("value-level__pin--first")){let e=firstPin.pin.offsetLeft+l;e=firstPin.getX(e),firstPin.value.value=Math.floor(e/MAX*maxValue)}else{let e=secondPin.pin.offsetLeft+l;e=secondPin.getX(e,l),secondPin.value.value=Math.floor(e/MAX*maxValue)}t=n.changedTouches[0].pageX},l=function(e){e.preventDefault(),document.removeEventListener("touchmove",n),document.removeEventListener("touchend",l)};document.addEventListener("touchmove",n),document.addEventListener("touchend",l)},numberChange=function(e){if(0===e){let e=firstPin.value.value*MAX/maxValue;e=firstPin.getX(e),e<firstPin.value.value*MAX/maxValue&&(firstPin.value.value=secondPin.value.value)}else{let e=secondPin.value.value*MAX/maxValue;e=secondPin.getX(e),e>secondPin.value.value*MAX/maxValue&&(secondPin.value.value=firstPin.value.value)}},initSlider=function(){MAX=line.offsetWidth-firstPin.pin.offsetWidth,firstPin.getX(firstPin.value.value*MAX/maxValue),secondPin.getX(secondPin.value.value*MAX/maxValue)};levelValues.forEach((function(e,t){e.addEventListener("change",(function(){numberChange(t)}))})),levelPins.forEach((function(e,t){e.addEventListener("mousedown",(function(e){sliderHandler(e)})),e.addEventListener("touchstart",(function(e){mobileSliderHandler(e)})),e.addEventListener("keydown",(function(n){39===n.keyCode&&toValue(e).value<parseInt(maxValue)&&(toValue(e).value=parseInt(toValue(e).value)+1,numberChange(t)),37===n.keyCode&&toValue(e).value>0&&(toValue(e).value=parseInt(toValue(e).value)-1,numberChange(t))}))}));const getCurrentDevice=function(){return window.matchMedia("(max-width: 767px)").matches?"mobile":window.matchMedia("(min-width: 1440px)").matches?"desktop":"tablet"};window.addEventListener("resize",(function(){if(null!==(window.matchMedia("(max-width: 767px)").matches?"mobile":window.matchMedia("(min-width: 1440px)").matches?"desktop":"tablet")){const e=line.closest(".accordion-filter__fieldset");e.classList.contains("accordion-filter__fieldset--open")?initSlider():(e.classList.toggle("accordion-filter__fieldset--open"),initSlider(),e.classList.toggle("accordion-filter__fieldset--open"))}})),initSlider();