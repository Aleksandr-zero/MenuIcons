import {
	ANIMATE,
	TABLE,
	COMMON_CSS,
	GET_REQUESTED_CSS,
	COMMON_JS
} from "./constants.js";


const stylesToBeRemoved = {

};


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
	let blankCss = temp.replace(/{{ padding-value-main }}/, `${foundCss.padding}`);

	blankCss = blankCss.replace(/{{ width-value-span }}/, `${foundCss.span.width}`);
	blankCss = blankCss.replace(/{{ height-value-span }}/, `${foundCss.span.height}`);

	blankCss = blankCss.replace(/{{ span-before-top }}/, `${foundCss.span_before.top}`);
	blankCss = blankCss.replace(/{{ span-after-bottom }}/, `${foundCss.span_after.bottom}`);

	return blankCss;
};

export const createTempCss_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	const foundCss = pullsStylesBtn(
		tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn")
	);

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let blankCss = buildCss_FromTemp(COMMON_CSS, foundCss);
	blankCss = cleaningCss(blankCss);

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


const pullsStylesBtn_Span_PseudoElements = (el) => {
	/* Находит стили псевдо-элементов у элемента span  */

	const foundCss = {
		"before": {},
		"after": {}
	};
	
	foundCss["before"]["top"] = getComputedStyle(el, ":before").getPropertyValue(GET_REQUESTED_CSS.span_before.top);
	foundCss["after"]["bottom"] = getComputedStyle(el, ":after").getPropertyValue(GET_REQUESTED_CSS.span_after.bottom);

	return foundCss;
};

const pullsStylesBtn_Span = (el) => {
	/* Находит стили у элемента span  */

	const foundCss = {};

	foundCss[GET_REQUESTED_CSS.span.width] = getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.width);
	foundCss[GET_REQUESTED_CSS.span.height] = getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.height);

	if ( parseInt(getComputedStyle(el).getPropertyValue(GET_REQUESTED_CSS.span.height)) <= 0 ) {
		stylesToBeRemoved["height"] = true;
	};

	return foundCss;
};

function pullsStylesBtn(btn) {
	/* Находит все стили кнопки (по обьекту "GET_REQUESTED_CSS") и возвращает обьект.  */

	const foundCss = {
		"span": {},
		"span_before": {},
		"span_after": {}
	};

	const span = btn.querySelector("span");
	const cssSpanPseudoElements = pullsStylesBtn_Span_PseudoElements(span);

	foundCss[GET_REQUESTED_CSS.padding] = getComputedStyle(btn).getPropertyValue(GET_REQUESTED_CSS.padding);
	foundCss["span"] = pullsStylesBtn_Span(span);
	foundCss["span_before"] = cssSpanPseudoElements.before;
	foundCss["span_after"] = cssSpanPseudoElements.after;

	return foundCss;
};


function cleaningCss(blankCss) {
	const propertyCss = Object.keys(stylesToBeRemoved);

	propertyCss.forEach((property) => {

		if ( stylesToBeRemoved[property] ) {
			blankCss = blankCss.replace(`\t${property}: 0px;\n`, "");
		};

		delete stylesToBeRemoved[property];
	});

	return blankCss;
};
