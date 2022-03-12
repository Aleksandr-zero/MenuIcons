import {
	SETTINGS,
	PREFIX_ACTIVE_CLASS,
	TABLE,
	COMMON_JS,
} from "../constants.js";

import { createActiveClassBtn } from "../handler/btn.js";

import { buildReadyTemp_Hljs } from "../utils/index.js";


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	let tempJs = COMMON_JS;

	if ( "name_btn" in SETTINGS && SETTINGS["name_btn"] ) {
		let activeClassBtn = ("active_class_btn" in SETTINGS && SETTINGS["active_class_btn"]) ? SETTINGS["active_class_btn"] : false;
		if ( !activeClassBtn ) {
			activeClassBtn = createActiveClassBtn();
		};
	
		tempJs = tempJs.replace(/{{ menu-btn-class }}/g, SETTINGS["name_btn"]);
		tempJs = tempJs.replace(/{{ menu-btn-active-class }}/g, activeClassBtn);
	};

	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	let readyJs = tempJs.replace(/{{ menu-btn-active-class }}/g, `${nameBtn}${PREFIX_ACTIVE_CLASS}`);
	readyJs = buildReadyTemp_Hljs(readyJs, [/{{ menu-btn-class }}/g, /\t/g], [nameBtn, "  "], "javascript");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};
