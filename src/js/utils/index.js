import {
	NUMBER_MOVE_BORDER_OF_SCREEN,
	NUMBER_CHECK_BORDER_OF_SCREEN,
	ACTIVE_CLASSES_BUTTON,
} from "../constants.js";


export function checksIfBlockIsOutOfWindow(block) {
	const widtnBody = document.querySelector("body").clientWidth
	const widthWindow_WithScroll = document.documentElement.scrollWidth;
	const widthWindow_Browser = widthWindow_WithScroll - (widthWindow_WithScroll - widtnBody);

	const styleBlock = block.getBoundingClientRect();

	if ( styleBlock.x + styleBlock.width + NUMBER_CHECK_BORDER_OF_SCREEN >= widthWindow_Browser ) {
		const positionLeft_ToExitWindow = (styleBlock.x + styleBlock.width + NUMBER_CHECK_BORDER_OF_SCREEN) - widthWindow_Browser;
		block.closest(".demo-code").style.left = `-${positionLeft_ToExitWindow + NUMBER_MOVE_BORDER_OF_SCREEN}px`;

	} else if ( styleBlock.x <= NUMBER_CHECK_BORDER_OF_SCREEN ) {
		block.closest(".demo-code").style.right = `-${Math.abs(styleBlock.x) + NUMBER_MOVE_BORDER_OF_SCREEN}px`;
	};
};


export function is_ActiveClass_AtCss(textCss, nameBtn) {
	for ( let index = 1; index < ACTIVE_CLASSES_BUTTON[nameBtn] + 1; index++ ) {
		if ( textCss.includes(`${nameBtn}-${index}`) ) {
			return true;
		};
	};

	return false;
};


export function buildReadyTemp_Hljs(baseTemp, regArr, regReplaceArr, languageHljs) {
	let readyTemp = baseTemp.replace(regArr[0], regReplaceArr[0]);
	readyTemp = readyTemp.replace(regArr[1], regReplaceArr[1]);
	readyTemp = hljs.highlight(readyTemp, { language: languageHljs }).value;

	return readyTemp;
};
