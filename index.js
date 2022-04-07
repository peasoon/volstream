//burger-------------------------------------------------------
import { bindBurger } from "./project/modules/burger/burger.js";

const burgerBtn = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__nav');

bindBurger(burgerBtn, burgerMenu);
//end of burger------------------------------------------------

//tabs---------------------------------------------------------
import { boundTabs } from "./project/modules/tabs/tabs.js";

boundTabs(".cm-tabs__tabs");
//end of tabs-------------------------------------------------


//quiz---------------------------------------------------------
const quizBtnPrev = document.querySelector(".cmp-btns__prev");
const quizBtnNext = document.querySelector(".cmp-btns__next");

const quizHeadings = document.querySelector(".cmt-tabs__headings");
const quizProgress = document.querySelector("#quizProgress");
const quizProcent = document.querySelector("#quizProcent");

let quizPosition = 1;

quizBtnPrev.addEventListener("click", () => {
  if (quizPosition > 1) {
    quizPosition--;
  }
  quizHeadings.children[quizPosition - 1].click();
  quizProgress.value -= 50;
  quizProcent.textContent = `${quizProgress.value} %`;
});

quizBtnNext.addEventListener("click", () => {
  if (quizPosition < 3) {
    quizPosition++;
  }
  quizHeadings.children[quizPosition - 1].click();
  quizProgress.value += 50;
  quizProcent.textContent = `${quizProgress.value} %`;
});
//end of quiz-----------------------------------------------

//sliders---------------------------------------------------

import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const sliderBound = (selector) => {
  const slider = document.querySelector(selector);
  const swiper = new Swiper(slider, {
    slidesPerView: "auto",
    spaceBetween: 40,
    loop: true,

    navigation: {
      nextEl: slider.parentElement.querySelector(".swiper-button-next"),
      prevEl: slider.parentElement.querySelector(".swiper-button-prev"),
    },
  });
};

sliderBound(".reviews-slider__slider");
sliderBound(".ready-slider__slider");
sliderBound(".accessories-slider__slider");

//end of sliders------------------------------------------------------

//accordeons-----------------------------------------------------------

import { bindAccordeon } from "./project/modules/accordeon/acordeon.js";
import "./project/modules/accordeon/_accordeon.scss";

const accordeons = document.querySelectorAll(".questions-accordeon__accordeon");
//bindAccordeon('.questions-accordeon__accordeon', 20)

accordeons.forEach((item) => {
  bindAccordeon(item, 20);
});

//end of accordeons-------------------------------------------------------------

//yandex maps-------------------------------------------------------------------
import ymaps from "ymaps";

(async () => {
  try {
    let maps = await ymaps.load(
      "https://api-maps.yandex.ru/2.1/?apikey=4e77e846-043d-47be-8481-1120f66a5db1&lang=ru_RU"
    );
    let map = await new maps.Map("map", {
      center: [55.72582306901897, 37.73436249999998],
      zoom: 17,
      controls: [],
    });
    map.controls.add("zoomControl", {
      position: { right: "40px", top: "5px" },
    });
    map.behaviors.disable("scrollZoom");

    let placemark = await new maps.Placemark(
      [55.72582306901897, 37.73436249999998],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "./img/footer/marker.png",
        iconImageSize: [40, 40],
        iconImageOffset: [0, 0],
      }
    );
    map.geoObjects.add(placemark);

		window.addEventListener("resize", () => {
			if(window.innerWidth < 1000 && window.innerWidth > 750) {
				map.setCenter([55.72557109837416,37.729347641507914],16);
				console.log('moving center');
			}
		});
  } catch (error) {
    console.log("Failed to load Yandex Maps", error);
  }
})();



//-------------------------------------------------------------------

//form validation----------------------------------------------------

import JustValidate from "just-validate";
import IMask from 'imask';

const form = document.querySelector(".consult-form__form");
const formPhone = document.querySelector("#cfFormPhone");

const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
var maskedPhone = IMask(formPhone, maskOptions);


const validate = new JustValidate(form);

validate.addField("#cfFormName", [
  {
    rule: "minLength",
    value: 3,
		errorMessage: 'Поле должно содержать минимум 3 символа'
  },
  {
    rule: "maxLength",
    value: 30,
  },
	{
		rule: 'required',
		value: true,
		errorMessage: 'Введите имя!'
	}
])
.addField("#cfFormPhone", [
	{
		rule: 'required',
		errorMessage: 'Введите номер телефона',
	}, 
	{
		rule: 'function',
		validator: function() {
			return maskedPhone.unmaskedValue.length === 11;
		},
		errorMessage: 'Введите валидный номер'
	}
])
.onSuccess(()=> {
	console.log('good')
	//sendForm()
})
.onFail(() => {
	console.log('fail')
});;
//-------------------------------------------------------------------
