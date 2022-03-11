import {
	ACTIVE_CLASSES_BUTTON
} from "../constants.js";


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