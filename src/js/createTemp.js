import {
	ANIMATE,
	NUMBER_FOR_DELAY_ANIMATE,

	TABLE,
	ACTIVE_CLASSES_BUTTON,
	COMMON_JS,
} from "./constants.js";

import { changeTitleBtnCopy } from "./handler/copy.js";

import { setColor } from "./handler/color.js";
import { setAnimation } from "./handler/animation.js";

import {
	findCss,
	convertCssToView
} from "./utils/index.js";


let activeClassAtBtn = false;
let cssForActiveClass = "";


export const createTempHtml_ForDemo = (tempBtn, typeTempCode) => {
	tempBtn = hljs.highlight(tempBtn, { language: 'xml' }).value;

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempBtn);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	return newTempCodeForDemo;
};

export const retrievesTempPressedBtnOpenDemo = (pressedBtn) => {
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


export const createTempCss_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let blankCss = cssBuild(nameBtn);
	blankCss = setColor(blankCss);
	blankCss = setAnimation(blankCss);

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyCss = buildReadyTemp_Hljs(blankCss, [/{{ name-btn }}/g, /\t/g], [nameBtn, "  "], "css");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyCss);

	return newTempCodeForDemo;
};

const cssBuild = (nameBtn) => {
	let blankCss = "";

	const rawCssArr = findCss(nameBtn);
	const readyCssArr = convertCssToView(rawCssArr);
	for ( let i = 0; i < readyCssArr.length; i++ ) {
		blankCss += `${readyCssArr[i]}\n`;
	};

	if ( cssForActiveClass ) blankCss += cssForActiveClass;

	return blankCss.trim();
};


const changeSelectorActiveClass = (cssText) => {
	cssText = cssText.replace(
		/[a-z](-[1-9])/g, "--active"
	);

	return cssText;
};


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	const readyJs = buildReadyTemp_Hljs(COMMON_JS, [/{{ menu-btn-class }}/g, /\t/g], [nameBtn, "  "], "javascript");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};


export const createTempScss_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];
	const rawCssArr = findCss(nameBtn);
	const foundCssSelectors = findCssSelectors(nameBtn);
	const tableScss = createTableScss(foundCssSelectors)
	
	let tempScss = buildTempScss(rawCssArr, foundCssSelectors, tableScss);
	tempScss = setColor(tempScss);
	tempScss = setAnimation(tempScss);
	tempScss = buildReadyTemp_Hljs(tempScss, [/{{ name-btn }}/g, /\t/g], [nameBtn, "  "], "scss");

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempScss);

	return newTempCodeForDemo;
};

const findCssSelectors = (nameBtn) => {
	const isActiveClass = ( activeClassAtBtn ) ? true : false;
	let cssSelectors = findCss(nameBtn, isActiveClass);

	for ( let cssSel = 0; cssSel < cssSelectors.length; cssSel++ ) {
		const cssSelector = cssSelectors[cssSel];
		let str = '';

		for ( let i = 0; i < cssSelector.length; i++ ) {
			const char = cssSelector[i];
			if ( char !== "{" ) str += char
			else {
				cssSelectors[cssSel] = str.trim();
				str = '';
				break;
			};
		};
	};

	return cssSelectors;
};

const createTableScss = (cssSelectors) => {
	const tableScss = [];
	const objUnpacking = {};

	for ( let indexSel = 0; indexSel < cssSelectors.length; indexSel++ ) {
		const cssSelector = cssSelectors[indexSel];
		const splitCssSelector = cssSelector.split(/\s/g);

		tableScss[indexSel] = splitCssSelector;
		objUnpacking[indexSel] = {};

		for ( let i = 0; i < tableScss[indexSel].length; i++ ) {
			const el = tableScss[indexSel][i];
			objUnpacking[indexSel][i] = el.split(":");
		};

		tableScss[indexSel] = [];

		const values = Object.values(objUnpacking[indexSel]);
		values.forEach((value) => {
			tableScss[indexSel].push(...value.filter(Boolean));
		});
		tableScss[indexSel] = [...new Set(tableScss[indexSel])];

		for ( let i = 0; i < tableScss[indexSel].length; i++ ) {
			const element = tableScss[indexSel][i];
			if ( element.search(/,+/) !== -1 ) {
				const repeatElement = tableScss[indexSel][i + 1];
				tableScss[indexSel][i] += ` ${repeatElement}`;

				tableScss[indexSel].splice(i + 1, 1);
			};
		};
	};

	return tableScss;
};

const buildTempScss = (rawCssArr, foundCssSelectors, tableScss) => {
	let readyCss = '';
	const foundCss = [];

	foundCssSelectors.forEach((cssSelector, index) => {
		let rawCssSelector = rawCssArr[index];
		rawCssSelector = rawCssSelector.replace(cssSelector, "");
		rawCssSelector = rawCssSelector.replace(/\s+[{]+\s/g, "");
		rawCssSelector = rawCssSelector.replace(/\s[}]+/g, "");
		
		foundCss.push(rawCssSelector);
	});

	tableScss.forEach((selectors, index) => {
		const currentLengthArr = selectors.length;
		const tabMultiplier = "\t".repeat(currentLengthArr);
		const countTab = `\n${tabMultiplier}`;

		if ( index === 0 ) {
			readyCss += `${selectors[currentLengthArr - 1]} {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n`;
		}
		else {
			let readyStr = `\n${"\t".repeat(currentLengthArr - 1)}${selectors[currentLengthArr - 1]}`;

			if ( tableScss[index + 1] && currentLengthArr !== tableScss[index + 1].length ) {
				readyStr += ` {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n`;
			} else {
				readyStr += ` {${countTab}${foundCss[index].replace(/;\s+/g, ";" + countTab)}\n${'\t'.repeat(currentLengthArr - 1)}}\n`;
			};
			if ( tableScss.length === index + 1 ) readyStr += `${'\t'.repeat(currentLengthArr - 2)}}\n}`;

			readyCss += readyStr;
		};
	});

	readyCss = readyCss.replace(/after/g, "&::after");
	readyCss = readyCss.replace(/before/g, "&::before");

	return readyCss.trim();
};


export const createTempDemo_ForDemo = (temp, nameBtn) => {
	const blockItems = document.createElement("ul");
	blockItems.className = "demo-code__content-items";

	for ( let numberClass = 0; ACTIVE_CLASSES_BUTTON[nameBtn] > numberClass; numberClass++ ) {
		blockItems.insertAdjacentHTML("beforeend", `
			<li class="demo-code__content-item">
				<button type="button" data-class-btn="${nameBtn + "-"}${numberClass + 1}" class="demo-code__content-item-btn">
					Active - ${numberClass + 1}
				</button>
				<div class="demo-code__content-item-add">
					<button type="button" data-class-btn="${nameBtn + "-"}${numberClass + 1}" class="demo-code__content-item-add-btn">
						<svg height="24" fill="#FFFFFF" viewBox="0 0 16 16" width="24">
							<path d="M7.75 2a.75.75 0 01.75.75V7h4.25a.75.75 0 110 1.5H8.5v4.25a.75.75 0 11-1.5 0V8.5H2.75a.75.75 0 010-1.5H7V2.75A.75.75 0 017.75 2z"></path>
						</svg>
					</button>
					<div class="demo-code__content-item-add-back-title">
						<h4 class="demo-code__content-item-add-title">Add class to<br>css properties</h4>
					</div>
				</div>
			</li>
		`);
	};

	const DOM_El_Temp = new DOMParser().parseFromString(temp, "text/xml");;
	DOM_El_Temp.querySelector(".demo-code__content").append(blockItems);

	return DOM_El_Temp.firstChild.innerHTML;
};

export const addEventBtns_ForDemoTemp = (btns, currentBtn) => {
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

export const addEventBtns_ForDemoTemp_AddActiveCLass = (btns) => {
	btns.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			const activeClass = event.currentTarget.dataset.classBtn;
			activeClassAtBtn = activeClass;

			const rawCssArr = findCss(activeClassAtBtn, true);
			const readyCssArr = convertCssToView(rawCssArr);
			for ( let i = 0; i < readyCssArr.length; i++ ) {
				cssForActiveClass += `${readyCssArr[i]}\n`;
			};
			cssForActiveClass = changeSelectorActiveClass(cssForActiveClass);

			const titleHelp = event.currentTarget.closest(".demo-code__content-item-add").querySelector(".demo-code__content-item-add-title");
			changeTitleBtnCopy(titleHelp, "Active class added", titleHelp.innerHTML);
		});
	});
};

export const removeLastActiveClassBtn = (btn, nameClassBtn, currentScoreActiveClass) => {
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

export const checkActiveClass_AtBtn = (currentBtn) => {
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

export const addEventBtn_DeleteCssProperties = (btnDelete) => {
	btnDelete.addEventListener("click", () => {
		cleanValuesAtClosing();

		const titleHelp = btnDelete.closest(".demo-code__container-back-delete-wrapper").querySelector(".demo-code__content-item-add-title");
		changeTitleBtnCopy(titleHelp, "CSS properties cleared", titleHelp.innerHTML);
	});
};


function buildReadyTemp_Hljs(baseTemp, regArr, regReplaceArr, languageHljs) {
	let readyTemp = baseTemp.replace(regArr[0], regReplaceArr[0]);
	readyTemp = readyTemp.replace(regArr[1], regReplaceArr[1]);
	readyTemp = hljs.highlight(readyTemp, { language: languageHljs }).value;

	return readyTemp;
};


export function cleanValuesAtClosing() {
	cssForActiveClass = "";
	activeClassAtBtn = false;
};
