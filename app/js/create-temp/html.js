import { TABLE } from "../constants.js";


export const createTempHtml_ForDemo = (tempBtn, typeTempCode) => {
	tempBtn = hljs.highlight(tempBtn, { language: 'xml' }).value;

	let newTempCodeForDemo = TABLE[typeTempCode];
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ demo-code }}/, tempBtn);
	newTempCodeForDemo = newTempCodeForDemo.replace(/{{ code-type }}/, `code-${typeTempCode}`);

	return newTempCodeForDemo;
};
