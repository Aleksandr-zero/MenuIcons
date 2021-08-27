import {
	ANIMATE,
	TABLE,
	COMMON_CSS,
	GET_REQUESTED_CSS,
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


const buildCss_FromTemp = (temp, foundCss) => {
	const blankCss = temp.replace(/{{ padding-value }}/, `${foundCss.padding}`);

	return blankCss;
};

export const createTempCss_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	const foundCss = pullsStylesBtn(
		tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn")
	);

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	const blankCss = buildCss_FromTemp(COMMON_CSS, foundCss);

	let readyCss = buildReadyTemp_Hljs(blankCss, [/{{ name-btn }}/g, /\t/g], [nameBtn, "  "], "css");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyCss);

	return newTempCodeForDemo;
};


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyJs = buildReadyTemp_Hljs(COMMON_JS, [/{{ menu-btn-class }}/g, /\t/g], [nameBtn, "  "], "javascript");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};


export const createTempDemo_ForDemo = (tempBtn, typeTempCode) => {

};


function buildReadyTemp_Hljs(baseTemp, regArr, regReplaceArr, languageHljs) {
	let readyTemp = baseTemp.replace(regArr[0], regReplaceArr[0]);
	readyTemp = readyTemp.replace(regArr[1], regReplaceArr[1]);
	readyTemp = hljs.highlight(readyTemp, { language: languageHljs }).value;

	return readyTemp;
};

export function checksIfBlockIsOutOfWindow(block) {
	const widthWindow = window.innerWidth;
	const widtnBody = document.querySelector("body").clientWidth
	const widthWindow_WithScroll = document.documentElement.scrollWidth;
	const widthWindow_Browser = widthWindow_WithScroll - (widthWindow_WithScroll - widtnBody);

	const styleBlock = block.getBoundingClientRect();

	if ( styleBlock.x + styleBlock.width >= widthWindow_Browser ) {
		const positionLeft_ToExitWindow = (widthWindow_WithScroll - widthWindow) + widthWindow - widtnBody;

		block.closest(".demo-code").style.left = `-${positionLeft_ToExitWindow + 50}px`;
	};
};


function pullsStylesBtn(btn) {
	/* Находит все стили кнопки (по обьекту "GET_REQUESTED_CSS") и возвращает обьект.  */

	const foundCss = {
		"before": {},
		"after": {}
	};

	foundCss["padding"] = getComputedStyle(btn).getPropertyValue("padding");

	return foundCss;
};
