import {
	SETTINGS,
	PREFIX_ACTIVE_CLASS
} from "../constants.js";


export const createActiveClassBtn = () => {
	return `${SETTINGS["name_btn"]}--active`;
};


export function setBtn(nameBtn, css) {
	if ( "name_btn" in SETTINGS && SETTINGS["name_btn"] ) {
		let activeClassBtn = ("active_class_btn" in SETTINGS && SETTINGS["active_class_btn"]) ? SETTINGS["active_class_btn"] : false;
		const regName = new RegExp(`${nameBtn}`, "g");
		const regActiveClass = new RegExp(`${nameBtn}${PREFIX_ACTIVE_CLASS}`, "g");

		if ( !activeClassBtn ) {
			activeClassBtn = createActiveClassBtn();
		};

		css = css.replace(regName, SETTINGS["name_btn"]);
		css = css.replace(regActiveClass, activeClassBtn);
	};

	return css;
};
