import {
	ANIMATE,
	TABLE,
	COMMON_CSS,
	COMMON_JS
} from "./constants.js";


export const createTempHtml_ForDemo = (tempBtn, typeTempCode) => {
	// Создание шаблона для демонстрации кода.

	tempBtn = hljs.highlight(tempBtn, { language: 'xml' }).value;

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempBtn);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	return newTempCodeForDemo;
};

export const retrievesTempPressedBtnOpenDemo = (pressedBtn) => {
	// Извлекает html (иконка для меню) при нажатии кнопки для показа кода.

	let currentMenuIconTemp = pressedBtn.closest('.example-item-active').querySelector(".example__item-content-wrapper-btn").cloneNode(true);

	const currentMenuIconBtn = currentMenuIconTemp.querySelector(".example__item-content-btn");
	currentMenuIconBtn.classList.remove("example__item-content-btn");
	currentMenuIconBtn.removeAttribute("data-type");

	currentMenuIconTemp = currentMenuIconTemp.innerHTML.trim();
	currentMenuIconTemp = currentMenuIconTemp.replace(/\t/g, "  ")

	return currentMenuIconTemp;
};


export const createTempCss_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyCss = COMMON_CSS.replace(/{{ name-btn }}/g, nameBtn);
	readyCss = readyCss.replace(/\t/g, "  ");
	readyCss = hljs.highlight(readyCss, { language: 'css' }).value;

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyCss);

	return newTempCodeForDemo;
};


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyJs = COMMON_JS.replace(/{{ menu-btn-class }}/g, nameBtn);
	readyJs = readyJs.replace(/\t/g, "  ");
	readyJs = hljs.highlight(readyJs, { language: 'javascript' }).value;

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};


export function checksFfBlockIsOutOfWindow(block) {
	const widthWindow = window.innerWidth;
	const widtnBody = document.querySelector("body").clientWidth
	const widthWindow_Scroll = document.documentElement.scrollWidth;
	const widthWindow_Browser = widthWindow_Scroll - (widthWindow_Scroll - widtnBody);

	const styleBlock = block.getBoundingClientRect();

	if ( styleBlock.x + styleBlock.width >= widthWindow_Browser ) {
		const positionLeft_ToExitWindow = (widthWindow_Scroll - widthWindow) + widthWindow - widtnBody;

		block.closest(".demo-code").style.left = `-${positionLeft_ToExitWindow + 50}px`;
	};
};
