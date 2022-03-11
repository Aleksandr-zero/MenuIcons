import {
	TABLE,
	COMMON_JS,
} from "../constants.js";

import { buildReadyTemp_Hljs } from "../utils/index.js";


export const createTempJs_ForDemo = (tempBtn, typeTempCode) => {
	const nameBtn = tempBtn.closest('.example-item-active').querySelector(".example__item-content-btn").classList[1];

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	const readyJs = buildReadyTemp_Hljs(COMMON_JS, [/{{ menu-btn-class }}/g, /\t/g], [nameBtn, "  "], "javascript");

	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, readyJs);

	return newTempCodeForDemo;
};
