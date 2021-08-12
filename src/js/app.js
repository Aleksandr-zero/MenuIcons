import { ANIMATE } from "./constants.js";


const blockExample = document.querySelector(".example");
const templateOpenMenu = document.querySelector(".open-menu");


const removeActiveMenu = () => {
	const activeBlock = blockExample.querySelector(".example-item-active");

	if ( activeBlock ) {
		activeBlock.classList.remove("example-item-active");
		activeBlock.querySelector(".open-menu__content").remove();
	};
};


const openMenuDemon = () => {
	const typeBtn = event.currentTarget.dataset.type;
	const currentItem = event.currentTarget.closest(".example__item");

	if ( currentItem.classList.contains("example-item-active") ) {
		currentItem.querySelector(".open-menu__content").remove();
		currentItem.classList.remove("example-item-active");
	} else {
		removeActiveMenu();
		currentItem.append(templateOpenMenu.content.cloneNode(true));
		currentItem.classList.add("example-item-active");
	};
};

const exampleItems = document.querySelectorAll(".example__item");

exampleItems.forEach((item) => {
	const btn = item.querySelector(".example__item-content-btn");

	btn.addEventListener("click", openMenuDemon);
});
