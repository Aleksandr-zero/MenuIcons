import {
	TEMP_HTML,
	TEMP_CSS,
	TEMP_JS
} from "./templates/temp.js";


export const ANIMATE = 0.2;

export const TABLE = {
	"html": `${TEMP_HTML}`,
	"css": `${TEMP_CSS}`,
	"js": `${TEMP_JS}`,
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

export const COMMON_JS = `
const menuBtn = document.querySelector(".{{ menu-btn-class }}");

menuBtn.addEventListener("click", () => {
	menuBtn.classList.toggle("{{ menu-btn-class }}--active");
});
`;
