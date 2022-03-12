import {
	SETTINGS,
	TABLE,
} from "../constants.js";


export const createTempHtml_ForDemo = (tempBtn, typeTempCode) => {
	if ( "name_btn" in SETTINGS && SETTINGS["name_btn"] ) {
		tempBtn = tempBtn.replace(/class="[\w-]{1,250}"/g, `class="${SETTINGS['name_btn']}"`);
	};

	tempBtn = hljs.highlight(tempBtn, { language: 'xml' }).value;

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempBtn);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	return newTempCodeForDemo;
};
