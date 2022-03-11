import {
	TABLE,
	CSS_FOR_ACTIVE_CLASS,
} from "../constants.js";

import { setColor } from "../handler/color.js";
import { setAnimation } from "../handler/animation.js";

import { buildReadyTemp_Hljs } from "../utils/index.js";
import {
	findCss,
	convertCssToView,
} from "../utils/css.js";


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

	if ( CSS_FOR_ACTIVE_CLASS ) blankCss += CSS_FOR_ACTIVE_CLASS;

	return blankCss.trim();
};
