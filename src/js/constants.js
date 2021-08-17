import {
	TEMP_HTML,
	TEMP_CSS
} from "./templates/temp.js";


export const ANIMATE = 0.2;

export const TABLE = {
	"html": `${TEMP_HTML}`,
	"css": `${TEMP_CSS}`,
	"js": ``,
	"demo": ``,
};


export const COMMON_CSS = `
.{{ name-btn }} {
	padding: 17px 5px;
}

.{{ name-btn }} span {
	position: relative;
	display: block;
	width: 44px;
	height: 5px;
	border-radius: 4px;
	background-color: #fefefe;
}

.{{ name-btn }} span::before {
	position: absolute;
	content: "";
}
`;
