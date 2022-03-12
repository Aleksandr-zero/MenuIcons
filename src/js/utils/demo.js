import {
	ANIMATE,
	NUMBER_FOR_DELAY_ANIMATE,
	ACTIVE_CLASS_AT_BTN,
	CSS_FOR_ACTIVE_CLASS,
	PREFIX_ACTIVE_CLASS,

	cleanValuesAtClosing,
	changeConstantActiveClass
} from "../constants.js";

import {
	findCss,
	convertCssToView,
} from "./css.js";
import { removeLastActiveClassBtn } from "./html.js";

import { changeTitleBtnCopy } from "../handler/copy.js";


export function addEventBtns_ForDemoTemp_AddActiveCLass(btns) {
	btns.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			const activeClass = event.currentTarget.dataset.classBtn;
			changeConstantActiveClass(activeClass);

			const rawCssArr = findCss(ACTIVE_CLASS_AT_BTN, true);
			const readyCssArr = convertCssToView(rawCssArr);
			let cssForActiveClass = "";
			for ( let i = 0; i < readyCssArr.length; i++ ) {
				cssForActiveClass += `${readyCssArr[i]}\n`;
			};
			changeConstantActiveClass(activeClass, cssForActiveClass);
			changeConstantActiveClass(activeClass, changeSelectorActiveClass(CSS_FOR_ACTIVE_CLASS, activeClass));

			const titleHelp = event.currentTarget.closest(".demo-code__content-item-add").querySelector(".demo-code__content-item-add-title");
			changeTitleBtnCopy(titleHelp, "Active class added", titleHelp.innerHTML);
		});
	});
};


const changeSelectorActiveClass = (cssText, activeClass) => {
	const nameBtn = activeClass.replace(/-[1-9]{1}/g, "");
	const activeClassBtn = `${nameBtn}${PREFIX_ACTIVE_CLASS}`;
	const reg = new RegExp(`${activeClass}`, "g");
	cssText = cssText.replace(reg, activeClassBtn);

	return cssText;
};


export function addEventBtns_ForDemoTemp(btns, currentBtn) {
	btns.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			const activeClass = event.currentTarget.dataset.classBtn;
			const nameClassBtn = `btn-menu-${currentBtn.dataset.type}`;

			const activeBtn = event.currentTarget.closest(".demo-code__content-items").querySelector(".demo-code__content-item-btn--active");
			if ( activeBtn ) {
				activeBtn.classList.remove("demo-code__content-item-btn--active");
			};

			event.currentTarget.classList.toggle("demo-code__content-item-btn--active");

			if ( currentBtn.classList.contains(activeClass) ) {
				event.currentTarget.classList.remove("demo-code__content-item-btn--active");
				currentBtn.classList.remove(activeClass);
				return;
			};

			const isActiveClasses = removeLastActiveClassBtn(currentBtn, nameClassBtn, activeClass.slice(-1));

			if ( isActiveClasses ) {
				setTimeout(() => {
					currentBtn.classList.add(activeClass);
				}, ANIMATE + NUMBER_FOR_DELAY_ANIMATE);
			} else {
				currentBtn.classList.add(activeClass);
			};
		});
	});
};


export function addEventBtn_DeleteCssProperties(btnDelete) {
	btnDelete.addEventListener("click", () => {
		cleanValuesAtClosing();

		const titleHelp = btnDelete.closest(".demo-code__container-back-delete-wrapper").querySelector(".demo-code__content-item-add-title");
		changeTitleBtnCopy(titleHelp, "CSS properties cleared", titleHelp.innerHTML);
	});
};
