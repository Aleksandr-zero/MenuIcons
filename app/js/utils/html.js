import {
	ACTIVE_CLASSES_BUTTON,
} from "../constants.js";


export function retrievesTempPressedBtnOpenDemo(pressedBtn) {
	let currentMenuIconTemp = pressedBtn.closest('.example-item-active').querySelector(".example__item-content-wrapper-btn").cloneNode(true);

	const currentMenuIconBtn = currentMenuIconTemp.querySelector(".example__item-content-btn");

	removeLastActiveClassBtn(currentMenuIconBtn, `btn-menu-${currentMenuIconBtn.dataset.type}`, 0);

	currentMenuIconBtn.classList.remove("example__item-content-btn");
	currentMenuIconBtn.removeAttribute("data-type");

	currentMenuIconTemp = currentMenuIconTemp.innerHTML.trim();

	const regCloseTag = new RegExp("</span>", "g")
	currentMenuIconTemp = currentMenuIconTemp.replace(/<span>/g, "\n  <span>");
	currentMenuIconTemp = currentMenuIconTemp.replace(regCloseTag, "</span>\n");

	return currentMenuIconTemp;
};


export function removeLastActiveClassBtn(btn, nameClassBtn, currentScoreActiveClass) {
	let isActiveClasses = 0;

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameClassBtn] > numberClass; numberClass++ ) {
		if ( currentScoreActiveClass === numberClass + 1 ) {
			continue;
		};

		if ( btn.classList.contains(`${nameClassBtn}-${numberClass + 1}`) ) {
			btn.classList.remove(`${nameClassBtn}-${numberClass + 1}`);
			isActiveClasses++;
		};
	};

	if ( isActiveClasses ) {
		return true;
	};
};


export function checkActiveClass_AtBtn(currentBtn) {
	let activeClassAtBtn = false;
	const classesAtCurrentBtn = currentBtn.classList;
	const nameClassBtn = `btn-menu-${currentBtn.dataset.type}`;

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameClassBtn] > numberClass; numberClass++ ) {
		if ( classesAtCurrentBtn.contains(`${nameClassBtn}-${numberClass + 1}`) ) {
			activeClassAtBtn = `${nameClassBtn}-${numberClass + 1}`;
			break;
		};
	};

	if ( activeClassAtBtn ) {
		addActiveClassBtn_AfterReCreation(currentBtn, activeClassAtBtn);
	};
};

const addActiveClassBtn_AfterReCreation = (currentBtn, activeClassAtBtn) => {
	const activeBtnAddedClass = currentBtn.closest(".example__item").querySelector(
		`.demo-code__content-item-btn[data-class-btn="${activeClassAtBtn}"]`
	);
	activeBtnAddedClass.classList.add("demo-code__content-item-btn--active");
};
