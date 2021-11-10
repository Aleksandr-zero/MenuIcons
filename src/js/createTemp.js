import {
	ANIMATE,
	TABLE,
	COMMON_CSS,
	GET_REQUESTED_CSS,
	SAME_VALUES_PROPERTIES,
	REMOVED_PROPERTY,
	REPLACEMENTS_CSS,
	COMMON_JS
} from "./constants.js";

import { matrixTransformation } from "./matrixTransformation.js";


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

	currentMenuIconTemp = currentMenuIconTemp.replace(/<span>/g, "\n  <span>");
	currentMenuIconTemp = currentMenuIconTemp.replace(`</span>`, "</span>\n");

	return currentMenuIconTemp;
};


const buildCss_FromTemp = ( temp, foundCss ) => {
	const keysReplacementsCSS = Object.keys(REPLACEMENTS_CSS);
	keysReplacementsCSS.forEach((keyReplaceCSS) => {
		let property = foundCss;

		const pathToProperty = REPLACEMENTS_CSS[keyReplaceCSS];
		const partsPathToProperty = pathToProperty.split(".");

		partsPathToProperty.forEach((partPath, index) => {
			property = property[partPath];
		});

		temp = temp.replace(keyReplaceCSS.trim(), property);
	});

	return temp;
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
		"before_after": {},
		"before": {},
		"after": {}
	};

	for ( let property in GET_REQUESTED_CSS.span_before ) {
		foundCss["before"][property] = getComputedStyle(el, ":before").getPropertyValue(GET_REQUESTED_CSS.span_before[property]);

		if ( property === "transform" && foundCss["before"]["transform"] !== "none" ) {
			foundCss["before"]["transform"] = matrixTransformation(foundCss["before"]["transform"]);
		};
	};

	for ( let property in GET_REQUESTED_CSS.span_after ) {
		foundCss["after"][property] = getComputedStyle(el, ":after").getPropertyValue(GET_REQUESTED_CSS.span_after[property]);

		if ( property === "transform" && foundCss["after"]["transform"] !== "none" ) {
			foundCss["after"]["transform"] = matrixTransformation(foundCss["after"]["transform"]);
		};
	};

	for ( let property in GET_REQUESTED_CSS.span_bef_af ) {
		foundCss["before_after"][property] = getComputedStyle(el, ":before").getPropertyValue(GET_REQUESTED_CSS.span_bef_af[property]);
	};

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

	let foundCss = {
		"span": {},
		"before_after": {},
		"span_before": {},
		"span_after": {}
	};

	const span = btn.querySelector("span");
	const cssSpanPseudoElements = pullsStylesBtn_Span_PseudoElements(span);

	foundCss[GET_REQUESTED_CSS.padding] = getComputedStyle(btn).getPropertyValue(GET_REQUESTED_CSS.padding);
	foundCss["span"] = pullsStylesBtn_Span(span);
	foundCss["span_before"] = cssSpanPseudoElements.before;
	foundCss["span_after"] = cssSpanPseudoElements.after;
	foundCss["before_after"] = cssSpanPseudoElements.before_after;

	foundCss = checkSameValuesForProperties(foundCss);
	foundCss = removesEmptyProperties(foundCss);

	return foundCss;
};


function checkSameValuesForProperties(foundCss) {
	const propertiesSpan = Object.keys(foundCss.span);

	for ( const property in foundCss.before_after ) {
		if ( SAME_VALUES_PROPERTIES.includes(property) ) {
			const propertyValue_span = parseFloat(foundCss.span[property]);
			const propertyValue_pseudo = parseFloat(foundCss.before_after[property]);

			if ( propertyValue_span === propertyValue_pseudo ) {
				foundCss.before_after[property] = "100%";
			} else {
				const percent = Math.round(propertyValue_pseudo / (propertyValue_span / 100));

				if ( !isFinite(percent) ) {
					continue;
				};

				foundCss.before_after[property] = `${percent}%`;
			};
		};
	};

	return foundCss;
};

function removesEmptyProperties(foundCss) {

	const checkProperty = (obj) => {
		for ( const property in obj ) {
			if ( REMOVED_PROPERTY.includes(property) && obj[property] === "none" ) {
				delete obj[property];
				stylesToBeRemoved["transform"] = true;
			};
		};
	};

	checkProperty(foundCss.span_after);
	checkProperty(foundCss.span_before);

	return foundCss;
};

function cleaningCss(blankCss) {
	const propertyCss = Object.keys(stylesToBeRemoved);

	propertyCss.forEach((property) => {
		if ( stylesToBeRemoved[property] ) {
			blankCss = blankCss.replaceAll(`\t${property}: 0px;\n`, "");
			blankCss = blankCss.replaceAll(`\t${property}: undefined;\n`, "");
		};

		delete stylesToBeRemoved[property];
	});

	return blankCss;
};
